import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { NodeId } from '@resideo-nest/core';
import { ClaimsResolver } from './claims.resolver';
import { ClaimsService } from './claims.service';
import {
  resolvers as scalarResolvers,
  typeDefs as scalarTypeDefs,
} from 'graphql-scalars';

@Module(
  {
    imports: [
      GraphQLModule.forRoot<ApolloFederationDriverConfig>(
        {
          driver: ApolloFederationDriver,
          autoSchemaFile: true,
          typeDefs: {
            ...scalarTypeDefs,
          },
          resolvers: {
            ...scalarResolvers,
            NodeID: NodeId,
          },
          buildSchemaOptions: {
            orphanedTypes: [
            ],
          },
        },
      ),
    ],
    providers: [
      ClaimsService,
      ClaimsResolver,
    ],
  },
)
export class ClaimsModule {}
