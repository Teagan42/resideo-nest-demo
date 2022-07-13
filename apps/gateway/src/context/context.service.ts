import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { LoggerService } from '@resideo-nest/core';
import {
  CONTEXT_DATA,
  ContextData,
  UserContextData,
} from './context.data';

@Injectable()
export class ContextService {
  constructor(
    private readonly logger: LoggerService,
    private readonly httpService: HttpService,
    @Inject(CONTEXT_DATA) private readonly contextData: ContextData,
  ) {
  }

  public get userContextData(): ContextData {
    return this.contextData;
  }

  public async retrieveUserClaims(): Promise<UserContextData> {
    this.logger.warn('RETRIEVE USER CLAIMS');
    return this.httpService
               .axiosRef
               .post(
                 'http://localhost:3000/graphql',
                 JSON.stringify(this.getIssuedClaimsPayload(this.contextData.userId)),
                 {
                   headers: {
                     'm2m': 'true',
                   },
                 },
               )
               .then(
                 (res) => {
                   this.logger.log(res);
                   return res.data.data.getUserByIdId.claims.reduce(
                     (
                       ctx,
                       claim,
                     ) => this.contextData.assignClaim(
                       claim.state === 'GRANTED' && Date.now() > (claim.expiresAt ?? 0),
                       claim.action,
                       claim.subject,
                       claim.subjectId,
                       claim.field,
                     ),
                     this.contextData,
                   );
                 },
               )
               .catch(this.logger.error)
               .finally(this.contextData.userContext);
  }

  private getIssuedClaimsPayload(userId: string) {
    return {
      query: 'query GetUserById($getUserByIdId: NodeId!) {\n  getUserById(id: $getUserByIdId) {\n    id\n    email\n    firstName\n    lastName\n    password\n    phoneNumber\n    username\n    updatedAt\n    createdAt\n    claims {\n      action\n      createdAt\n      expiresAt\n      field\n      granteeId\n      grantorId\n      state\n      subject\n      subjectId\n      updatedAt\n      id\n    }\n  }\n}',
      variables: {
        getUserByIdId: userId,
      },
    };
  };
}
