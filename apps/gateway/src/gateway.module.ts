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
          server: {
            playground: true,
            debug: true,
          },
          gateway: {
            supergraphSdl: new IntrospectAndCompose(
              {
                subgraphs: [
                  {
                    name: 'users',
                    url: 'http://localhost:3001/graphql',
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
