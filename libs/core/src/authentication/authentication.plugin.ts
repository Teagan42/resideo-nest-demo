import { Plugin } from '@nestjs/apollo';
import { LoggerService } from '@resideo-nest/core/common';
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';

@Plugin()
export class AuthenticationPlugin
  implements ApolloServerPlugin<BaseContext> {

  constructor(
    private readonly logger: LoggerService,
  ) {
  }

  async requestDidStart(context): Promise<GraphQLRequestListener> {
    const logger = new LoggerService('AuthPlugin');
    logger.log('Request started');
    return {
      async parsingDidStart(context) {
        const logger = new LoggerService('AuthPlugin::ParseStart');
        logger.log('Parsing started');
        // logger.log(context.request.operationName);
      },
      async validationDidStart(context) {
        const logger = new LoggerService('AuthPlugin::ValidationStart');
        logger.log('Validation did start');
      },
      async executionDidStart(context) {
        const logger = new LoggerService('AuthPlugin::ExecStart');
        logger.log('Execution did start');
        // logger.log(context.operation);
        return {
          willResolveField({
                             source,
                             args,
                             context,
                             info,
                           }) {
            const logger = new LoggerService('AuthPlugin::ResolveField');
            // logger.log(args);
            // logger.log(context.getType());
            // logger.log(source)
          },
        };
      },
      async didResolveOperation(context) {
        logger.log('Resolved operation');
      },
      async willSendResponse(context) {
        logger.log('Will send response');
        // logger.log(context.request.query);
      },
    };
  }
}
