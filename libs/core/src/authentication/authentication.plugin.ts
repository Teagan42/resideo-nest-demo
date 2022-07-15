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
    this.logger.resetContext()
      .withContext("requestDidStart")
      .log(context);
    return {
      async parsingDidStart(context) {
        this.logger.withContext("ParsingDidStart")
            .log(context);
      },
      async validationDidStart(context) {
        this.logger.withContext("validationDidStart")
            .log(context);
      },
      async executionDidStart(context) {
        this.logger.withContext("executionDidStart")
            .log(context);
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
        this.logger.withContext("didResolveOperation")
            .log(context);
      },
      async willSendResponse(context) {
        this.logger.withContext("willSendResponse")
            .log(context);
      },
    };
  }
}
