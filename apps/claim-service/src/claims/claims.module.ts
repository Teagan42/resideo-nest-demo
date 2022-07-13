import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { NodeId } from '@resideo-nest/core';
import {
  resolvers as scalarResolvers,
  typeDefs as scalarTypeDefs,
} from 'graphql-scalars';
import { ClaimsResolver } from './claims.resolver';
import { ClaimsService } from './claims.service';
import { User } from './models/user.model';
import { UsersResolver } from './users.resolver';

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
      ClaimsService,
      ClaimsResolver,
      UsersResolver,
    ],
  },
)
export class ClaimsModule {

}
