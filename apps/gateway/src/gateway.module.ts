import { IntrospectAndCompose } from '@apollo/gateway';
import {
  ApolloGatewayDriver,
  ApolloGatewayDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

@Module(
  {
    imports: [
      GraphQLModule.forRoot<ApolloGatewayDriverConfig>(
        {
          driver: ApolloGatewayDriver,
          server: {},
          gateway: {
            __exposeQueryPlanExperimental: true,
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
                ],
              },
            ),
          },
        },
      ),
    ],
    controllers: [GatewayController],
    providers: [GatewayService],
  })
export class GatewayModule {
}
