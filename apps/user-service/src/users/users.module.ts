import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { NodeID } from '@resideo-nest/core';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module(
  {
    imports: [
      GraphQLModule.forRoot<ApolloFederationDriverConfig>(
        {
          driver: ApolloFederationDriver,
          autoSchemaFile: true,
          debug: false,
          playground: false,
          buildSchemaOptions: {
              // directives:
          },
          resolvers: {
            NodeID: () => NodeID,
          },
        },
      ),
    ],
    providers: [
      NodeID,
      UsersService,
      UsersResolver,
    ],
  })
export class UsersModule {
}
