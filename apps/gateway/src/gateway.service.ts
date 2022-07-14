import {
  IntrospectAndCompose,
} from '@apollo/gateway';
import { ApolloGatewayDriverConfig } from '@nestjs/apollo';
import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { LoggerService } from '@resideo-nest/core';
import {
  CONTEXT_REMOTE,
  ContextRemoteDataSource,
} from './context/context.remote';
import { ContextService } from './context/context.service';

@Injectable()
export class GatewayService
  implements GqlOptionsFactory<ApolloGatewayDriverConfig> {
  constructor(
    private readonly logger: LoggerService,
    private readonly contextService: ContextService,
    @Inject(CONTEXT_REMOTE) private readonly contextRemoteFactory: (url: string) => ContextRemoteDataSource
  ) {
    this.logger.log('Inside Gateway Service');
  }

  private getRemoteDataSource(
    name: string,
    url: string
  ): ContextRemoteDataSource {
    return this.contextRemoteFactory(url);
  }

  async createGqlOptions(): Promise<Omit<ApolloGatewayDriverConfig, 'driver'>> {
    this.logger.log('Creating GQL Options');
    return {
      server: {
        context: this.contextService.userContextData,
      },
      gateway: {
        __exposeQueryPlanExperimental: true,
        buildService: ({name, url}) => this.getRemoteDataSource(name, url),
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
