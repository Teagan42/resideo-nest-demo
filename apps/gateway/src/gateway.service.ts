import {
  IntrospectAndCompose,
  ServiceEndpointDefinition,
} from '@apollo/gateway';
import { ApolloGatewayDriverConfig } from '@nestjs/apollo';
import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { LoggerService } from '@resideo-nest/core';
import {
  RemoteDataSourceFactory,
} from './context/context.remote';
import { ContextService } from './context/context.service';

@Injectable()
export class GatewayService
  implements GqlOptionsFactory<ApolloGatewayDriverConfig>, OnModuleInit, OnModuleDestroy {

  constructor(
    private readonly logger: LoggerService,
    private readonly contextService: ContextService,
    private readonly remoteDataSourceFactory: RemoteDataSourceFactory,
  ) {
    this.logger.log(`Inside Gateway Service: ${contextService} ${remoteDataSourceFactory}`);
  }

  onModuleInit(): any {
    this.contextService.isLoaded = true;
  }

  onModuleDestroy(): any {
    this.contextService.isLoaded = false;
  }

  async createGqlOptions(): Promise<Omit<ApolloGatewayDriverConfig, 'driver'>> {
    const self = this;
    return {
      server: {
        context: this.contextService.userContextData,
      },
      gateway: {
        __exposeQueryPlanExperimental: true,
        buildService: (serviceEndPoint: ServiceEndpointDefinition) =>
          self.remoteDataSourceFactory.from(
            this.contextService,
            serviceEndPoint
          ),
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
