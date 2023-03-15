import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  LoggerModule,
  NodeId, Password, Username,
} from '@resideo-nest/core';
import {
  resolvers as scalarResolvers,
  typeDefs as scalarTypeDefs,
} from 'graphql-scalars';
import { ClaimsResolver } from './claims.resolver';
import { ClaimsService } from './claims.service';
import { DevicesResolver } from './devices.resolver';
import { Device } from './models/device.model';
import { SubjectUnion } from './models/SubjectUnion';
import { User } from './models/user.model';
import { UsersResolver } from './users.resolver';

@Module(
  {
    imports: [
      LoggerModule.build(
        'Claims Service',
        []
      ),
      GraphQLModule.forRoot<ApolloFederationDriverConfig>(
        {
          driver: ApolloFederationDriver,
          autoSchemaFile: true,
          debug: true,
          playground: true,
          context: ({req, res}) => (
            {
              req,
              res,
              userId: req?.headers?.userId,
              claims: req?.headers?.claims
            }
          ),
          typeDefs: {
            ...scalarTypeDefs,
          },
          resolvers: {
            ...scalarResolvers,
            NodeId,
            SubjectUnion,
            Password: Password,
            Username: Username
          },
          buildSchemaOptions: {
            orphanedTypes: [
              User,
              Device,
            ],
          },
        },
      ),
    ],
    providers: [
      ClaimsService,
      ClaimsResolver,
      UsersResolver,
      DevicesResolver,
    ],
  },
)
export class ClaimsModule {

}
