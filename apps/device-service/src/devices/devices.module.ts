import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { NodeID } from '@resideo-nest/core';
import { User } from './models/user.model';
import { DevicesResolver } from './devices.resolver';
import { DevicesService } from './devices.service';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import { resolvers as scalarResolvers } from 'graphql-scalars';
import { UsersResolver } from './users.resolver';

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
            NodeID: NodeID,
          },
          buildSchemaOptions: {
            orphanedTypes: [
              User
            ]
          }
        },
      ),
    ],
    providers: [
      DevicesService,
      DevicesResolver,
      UsersResolver
    ],
  })
export class DevicesModule {
}
