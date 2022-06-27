import { GraphQLRequestListener } from 'apollo-server-plugin-base';

export const GRAPHQL_REQUEST_LISTENER = Symbol('GraphQLRequestListener');

export const requestListenerFactory = {
  provide: GRAPHQL_REQUEST_LISTENER,
  useFactory: async (): Promise<GraphQLRequestListener> => {
    return {};
  }
};
