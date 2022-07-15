import { HttpService } from '@nestjs/axios';
import {
  Injectable,
} from '@nestjs/common';
import { LoggerService } from '@resideo-nest/core';
import {
  ContextData,
} from './context.data';
import {graphql, GraphQLSchema} from "graphql";
import { GraphQLClient } from 'graphql-request';
import {InjectGraphQLClient} from "@golevelup/nestjs-graphql-request";

@Injectable()
export class ContextService {
  private static USER_CLAIM_QUERY =
    "query getUserById($userId: NodeId!) {\n" +
    "  getUserById(id: $userId) {\n" +
    "    id\n" +
    "    email\n" +
    "    firstName\n" +
    "    lastName\n" +
    "    password\n" +
    "    phoneNumber\n" +
    "    username\n" +
    "    updatedAt\n" +
    "    createdAt\n" +
    "    claims {\n" +
    "      action\n" +
    "      createdAt\n" +
    "      expiresAt\n" +
    "      field\n" +
    "      granteeId\n" +
    "      grantorId\n" +
    "      state\n" +
    "      subject\n" +
    "      subjectId\n" +
    "      updatedAt\n" +
    "      id\n" +
    "    }\n" +
    "  }\n" +
    "}";
  private static getIssuedClaimsVariables(userId: string) {
    return {
      userId: userId,
    };
  };
  private static getIssuedClaimsPayload(userId: string) {
    return {
      query: ContextService.USER_CLAIM_QUERY,
      variables: ContextService.getIssuedClaimsVariables(userId),
    };
  };

  private _isBusy = false;
  public isLoaded = false;
  public schema?: GraphQLSchema = null;

  constructor(
    private readonly logger: LoggerService,
    private readonly httpService: HttpService,
    private readonly contextData: ContextData,
    @InjectGraphQLClient() private readonly client: GraphQLClient
  ) {
    this.logger.setContext("ContextService");
  }

  get isBusy(): boolean {
    return this._isBusy;
  }

  public get userContextData(): ContextData {
    return this.contextData;
  }

  public updateSchema(
    schema: GraphQLSchema
  ) {
    this.schema = schema;
  }

  public async retrieveUserClaims(): Promise<ContextData> {
    this.logger.log(`Is loaded? ${this.isLoaded}`);
    if (!this.isLoaded || !this.schema) {
      return this.contextData;
    }
    this.logger.log(`Query Type ${this.schema.toConfig()}`);
    this._isBusy = true;
    try {
      const res = await this.client.request(
        ContextService.USER_CLAIM_QUERY,
        ContextService.getIssuedClaimsVariables(this.contextData.userId),
        {
          m2m: "true",
        }
      );
      this.logger.log(res);
      return res.getUserById.claims.reduce(
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

    return this.contextData;
  }
}
