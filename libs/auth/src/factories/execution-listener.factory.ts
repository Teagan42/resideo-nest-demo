import {
  GraphQLRequestExecutionListener,
} from 'apollo-server-plugin-base';

export const GRAPHQL_EXECUTION_LISTENER = Symbol('GraphQLExecutionListener');

const requestListenerFactory = {
  provide: GRAPHQL_EXECUTION_LISTENER,
  useFactory: async (): Promise<GraphQLRequestExecutionListener> => {
    return {};
  }
};


export class ExecutionListenerFactory {

}
