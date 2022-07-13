import {
  IntrospectAndCompose,
  RemoteGraphQLDataSource,
} from '@apollo/gateway';
import { ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { LoggerService } from '@resideo-nest/core';
import { ContextService } from './context/context.service';

class AuthenticatedDataSource
  extends RemoteGraphQLDataSource {

  constructor(
    private readonly contextService: ContextService

  ) {
    super();
  }

  async willSendRequest(
    {
      request,
      context,
    },
  ) {
    const ctx = await this.contextService.retrieveUserClaims();
    request.http.headers.set(
      'user-id',
       ctx.userId || context.userId,
    );
    request.http.headers.set(
      'claims',
      ctx.claims || context.claims || '',
    );
    if (request.http.headers['m2m'] !== 'true') {
      return;
    }
  }
}

@Injectable()
export class GatewayService
  implements GqlOptionsFactory<ApolloGatewayDriverConfig> {
  constructor(
    private readonly logger: LoggerService,
    private readonly contextService: ContextService,
  ) {
    this.logger.log('Inside Gateway Service');
  }

  async createGqlOptions(): Promise<Omit<ApolloGatewayDriverConfig, 'driver'>> {
    this.logger.log('Creating GQL Options');
    return {
      server: {
        context: this.contextService.userContextData,
      },
      gateway: {
        __exposeQueryPlanExperimental: true,
        buildService({
                       name,
                       url,
                     }) {
          (new LoggerService("BuildService")).log(`Creating data source for ${name} ${url}`);
          return new AuthenticatedDataSource( this.contexService, { url });
        },
        supergraphSdl: new IntrospectAndCompose(
          {
            pollIntervalInMs: 1500,
            subgraphs: [
              {
                name: 'users',
                url: 'http://localhost:3001/graphql',
              },
              {
                name: 'devices',
                url: 'http://localhost:3002/graphql',
              },
              {
                name: 'claims',
                url: 'http://localhost:3003/graphql',
              },
            ],
          },
        ),
      },
    };
  }
}
