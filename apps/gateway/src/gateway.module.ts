import {
  ApolloGatewayDriver,
  ApolloGatewayDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  LoggerModule,
  toId,
} from '@resideo-nest/core';
import { ContextModule } from './context/context.module';
import { GatewayService } from './gateway.service';

@Module(
  {
    imports: [
      LoggerModule.build('Application'),
      GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>(
        {
          driver: ApolloGatewayDriver,
          imports: [
            ContextModule.register(toId(
              'User',
              '42',
            )),
            LoggerModule.build('Gateway'),
          ],
          useClass: GatewayService,
        },
      ),
    ],
    exports: [
      GraphQLModule,
    ],
  })
export class GatewayModule {
}
