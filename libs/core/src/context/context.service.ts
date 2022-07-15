import { HttpService } from '@nestjs/axios';
import {
  Injectable,
} from '@nestjs/common';
import { LoggerService } from '@resideo-nest/core';
import {
  ContextData,
  UserContextData,
} from './context.data';

@Injectable()
export class ContextService {
  private _isBusy = false;
  public isLoaded = false;

  constructor(
    private readonly logger: LoggerService,
    private readonly httpService: HttpService,
    private readonly contextData: ContextData,
  ) {
    this.logger.setContext("ContextService");
  }

  get isBusy(): boolean {
    return this._isBusy;
  }

  public get userContextData(): UserContextData {
    return this.contextData;
  }

  public async retrieveUserClaims(): Promise<UserContextData> {
    this.logger.log(`Is loaded? ${this.isLoaded}`);
    if (!this.isLoaded) {
      return this.contextData;
    }
    this._isBusy = true;
    try {
      const res = await this.httpService
                            .axiosRef
                            .post(
                              'http://localhost:3000/graphql',
                              ContextService.getIssuedClaimsPayload(this.contextData.userId),
                              {
                                headers: {
                                  'm2m': 'true',
                                  'content-type': 'application/json'
                                },
                              },
                            );
      this.logger.log(res.request);
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
    } catch (e) {
      this.logger.error(e);
    } finally {
      this._isBusy = false;
    }

    return this.userContextData;
  }

  private static getIssuedClaimsPayload(userId: string) {
    return {
      query: 'query GetUserById($getUserByIdId: NodeId!) {\n  getUserById(id: $getUserByIdId) {\n    id\n    email\n    firstName\n    lastName\n    password\n    phoneNumber\n    username\n    updatedAt\n    createdAt\n    claims {\n      action\n      createdAt\n      expiresAt\n      field\n      granteeId\n      grantorId\n      state\n      subject\n      subjectId\n      updatedAt\n      id\n    }\n  }\n}',
      variables: {
        getUserByIdId: userId,
      },
    };
  };
}
