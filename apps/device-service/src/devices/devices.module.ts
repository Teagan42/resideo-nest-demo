import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import {
  AuthenticationInterceptor,
  LoggerModule,
  NodeId,
} from '@resideo-nest/core';
import {
  resolvers as scalarResolvers,
  typeDefs as scalarTypeDefs,
} from 'graphql-scalars';
import { DevicesResolver } from './devices.resolver';
import { DevicesService } from './devices.service';
import { User } from './models/user.model';
import { UsersResolver } from './users.resolver';

@Module(
  {
    imports: [
      LoggerModule.build('Device Service'),
      GraphQLModule.forRoot<ApolloFederationDriverConfig>(
        {
          driver: ApolloFederationDriver,
          autoSchemaFile: true,
          debug: true,
          playground: true,
          context: ({req, res}) => ({req, res}),
          typeDefs: {
            ...scalarTypeDefs,
          },
          resolvers: {
            ...scalarResolvers,
            NodeID: NodeId,
          },
          buildSchemaOptions: {
            orphanedTypes: [
              User,
            ],
          },
        },
      ),
    ],
    providers: [
      DevicesService,
      DevicesResolver,
      UsersResolver,
      AuthenticationInterceptor,
    ],
    exports: [
      LoggerModule,
    ]
  },
)
export class DevicesModule {
}
