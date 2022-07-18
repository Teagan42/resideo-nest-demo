import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  AUTH_PLUGIN_DELEGATE, AuthorizationPlugin,
  CanReadNode,
  CanReadType,
  LoggerModule,
  NodeId,
} from '@resideo-nest/core';
import {
  resolvers as scalarResolvers,
  typeDefs as scalarTypeDefs,
} from 'graphql-scalars';
import { DevicesResolver } from './devices.resolver';
import { DevicesService } from './devices.service';
import { User } from './models/user.model';
import { UsersResolver } from './users.resolver';
import {authZApolloPlugin} from "@graphql-authz/apollo-server-plugin";
import {Device} from "@resideo-nest/device-service/devices/models/device.model";

@Module(
  {
    imports: [
      LoggerModule.build('Device Service'),
      GraphQLModule.forRoot<ApolloFederationDriverConfig>(
        {
          driver: ApolloFederationDriver,
          autoSchemaFile: true,
          debug: true,
          playground: true,
          context: ({req, res}) => {
            console.log('DevicesContext', req?.headers || "");
            return {
              req,
              res,
              userId: req?.headers?.userId,
              claims: req?.headers?.claims
            };
          },
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
      DevicesService,
      DevicesResolver,
      UsersResolver,
      {
        provide: AUTH_PLUGIN_DELEGATE,
        useValue: authZApolloPlugin({
            rules: {
              CanReadType,
              CanReadDevice: CanReadNode<Device>("Device")
            }
          }
        )
      },
      AuthorizationPlugin,
    ],
    exports: [
      LoggerModule,
    ]
  },
)
export class DevicesModule {
}
