import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { NodeID } from '@resideo-nest/core';
import { AccountsService } from './accounts.service';
import { resolvers as scalarResolvers } from 'graphql-scalars';

let scalarTypeDefs;

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
    providers: [AccountsService],
    exports: [AccountsService]
  }
)
export class AccountsModule {}
