import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { NodeID } from '@resideo-nest/core';
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
