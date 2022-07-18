import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  LoggerModule,
  NodeId,
} from '@resideo-nest/core';
import {
  resolvers as scalarResolvers,
  typeDefs as scalarTypeDefs,
} from 'graphql-scalars';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module(
  {
    imports: [
      LoggerModule.build('User Service', []),
      GraphQLModule.forRoot<ApolloFederationDriverConfig>(
        {
          driver: ApolloFederationDriver,
          autoSchemaFile: true,
          debug: true,
          playground: true,
          typeDefs: {
            ...scalarTypeDefs,
          },
          resolvers: {
            ...scalarResolvers,
            NodeID: NodeId,
          },
        },
      ),
    ],
    providers: [
      UsersService,
      UsersResolver,
    ],
    exports: [
      LoggerModule,
    ]
  })
export class UsersModule {
}
