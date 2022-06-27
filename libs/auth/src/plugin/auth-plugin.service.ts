import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { GRAPHQL_REQUEST_LISTENER } from '@resideo-nest/auth-plugin/requests/listener.provider';
import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';

@Injectable()
export class AuthPluginService implements ApolloServerPlugin {
  constructor(
    @Inject(GRAPHQL_REQUEST_LISTENER) private readonly
  ) {
  }

  requestDidStart(requestContext: GraphQLRequestContext): Promise<GraphQLRequestListener | void> {
    return Promise.resolve(undefined);
  }

}
