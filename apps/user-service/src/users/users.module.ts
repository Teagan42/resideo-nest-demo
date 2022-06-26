import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { NodeID } from '@resideo-nest/core';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import { resolvers as scalarResolvers } from 'graphql-scalars';

@Module(
  {
    imports: [
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
            NodeID: NodeID
          },
        },
      ),
    ],
    providers: [
      UsersService,
      UsersResolver,
    ],
  })
export class UsersModule {
}
