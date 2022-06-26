import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { NodeID } from '@resideo-nest/core';
import { resolvers as scalarResolvers } from 'graphql-scalars';
import { AccountsResolver } from './accounts.resolver';
import { AccountsService } from './accounts.service';
import { ClaimsResolver } from './claims.resolver';
import { ClaimsService } from './claims.service';
import { UsersResolver } from './users.resolver';

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
            NodeID: NodeID,
          },
        },
      ),
    ],
    providers: [
      AccountsService,
      AccountsResolver,
      UsersResolver,
      ClaimsService,
      ClaimsResolver
    ],
    exports: [AccountsService],
  },
)
export class AccountsModule {
}
