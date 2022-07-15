import {
  ApolloGatewayDriver,
  ApolloGatewayDriverConfig,
} from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import {
  GraphQLModule,
} from '@nestjs/graphql';
import {
  LoggerModule,
  toId,
} from '@resideo-nest/core';
import { GatewayService } from './gateway.service';
import { ContextModule } from './gateway/context.module';
import {GraphQLRequestModule} from "@golevelup/nestjs-graphql-request";

@Module(
  {
    imports: [
      LoggerModule.build('Application'),
      GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>(
        {
          driver: ApolloGatewayDriver,
          imports: [
            HttpModule,
            LoggerModule.build('Gateway'),
            ContextModule.register(toId(
              'User',
              '42',
            )),
          ],
          useClass: GatewayService
        },
      ),
    ],
    exports: [
      GraphQLModule,
    ],
  })
export class GatewayModule {
}
