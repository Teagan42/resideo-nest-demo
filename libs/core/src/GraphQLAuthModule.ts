import {NodeId} from "@resideo-nest/core/types";
import {User} from "@resideo-nest/device-service/devices/models/user.model";
import {ApolloFederationDriver, ApolloFederationDriverConfig} from "@nestjs/apollo";
import {GraphQLModule} from "@nestjs/graphql";
import {DynamicModule} from "@nestjs/common";
import {
  resolvers as scalarResolvers,
  typeDefs as scalarTypeDefs,
} from 'graphql-scalars';

export const GraphQLAuthModuleConfig = (
  config: Partial<ApolloFederationDriverConfig> = {},
): DynamicModule =>
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
        NodeID: NodeId,
      },
      ...config,
    },
  );