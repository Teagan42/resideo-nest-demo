import { Plugin } from '@nestjs/apollo';
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestExecutionListener,
  GraphQLRequestListener,
  GraphQLRequestListenerDidResolveField,
  GraphQLSchemaContext,
  GraphQLServerListener,
  GraphQLServiceContext,
} from 'apollo-server-plugin-base';
import {LoggerService} from "@resideo-nest/core/logging";
import {debase} from "@resideo-nest/core/helpers";

@Plugin()
export class AuthenticationPlugin
  implements ApolloServerPlugin<BaseContext> {

  constructor(
    private readonly logger: LoggerService,
  ) {
    // console.error("PLUGIN");
  }

  async serverWillStart(service: GraphQLServiceContext): Promise<GraphQLServerListener | void> {
    // console.log("AuthenticationPlugin::serverWillStart");
    return {

      async drainServer(): Promise<void> {
        // console.log("AuthenticationPlugin::serverWillStart::drainServer");
      },

      async schemaDidLoadOrUpdate(schemaContext: GraphQLSchemaContext) {
        // console.log("AuthenticationPlugin::serverWillStart::schemaDidLoadOrUpdate");
      },

      async serverWillStop(): Promise<void> {
        // console.log("AuthenticationPlugin::serverWillStart::serverWillStop");
      }
    }
  }

  async requestDidStart(context: GraphQLRequestContext): Promise<GraphQLRequestListener> {
    if (context?.request?.http?.headers) {
      console.error(`requestDidStart`, context?.request?.http?.headers);
    }
    // console.error(`AuthenticationPlugin::requestDidStart ${context?.request.query} ${context?.request.operationName}`);
    return {
      async parsingDidStart(context) {
        // console.error(`AuthenticationPlugin::requestDidStart::parsingDidStart ${context?.context || ""}`);
      },
      async validationDidStart(context) {
        // console.error(`AuthenticationPlugin::requestDidStart::validationDidStart`);
      },
      async executionDidStart(context): Promise<GraphQLRequestExecutionListener> {
        if (context?.request?.http?.headers) {
          console.error(`executionDidStart`, context?.request?.http?.headers);
        }
        const claims = debase(context?.request?.http?.headers["claims"] ?? "");
        // console.error(`AuthenticationPlugin::requestDidStart::executionDidStart`);
        return {
          willResolveField(
            {
              source,
              args,
              context,
              info,
            }
          ) {
            // console.error(`AuthenticationPlugin::requestDidStart::executionDidStart::willResolveField`);
            // if (context && context?.request && context?.request?.headers) {
            //   console.error(`willResolveField`, context?.request?.http?.headers);
            // }
            // if (info && info?.parentType) {
            //   console.log(info.parentType.name)
            //   console.log(info.fieldName);
            //   if ([info.parentType.name, info.fieldName].includes('_service') ||
            //     [info.parentType.name, info.fieldName].includes('_sdl')){
            //     return;
            //   }
            // }
            // return (
            //   error: Error | null,
            //   result?: any,
            // ) => {
            //   if (error) {
            //     console.log(error);
            //   }
            //   // if (result) {
            //   //   console.log(result);
            //   // }
            // }
          },
        };
      },
      async didResolveOperation(context) {
        // console.error(`AuthenticationPlugin::requestDidStart::didResolveOperation ${context.operation.kind}`);
        // this.logger.withContext("didResolveOperation")
        //   .log(context);
      },
      async willSendResponse(context) {
        // console.error(`AuthenticationPlugin::requestDidStart::willSendResponse ${JSON.stringify(context?.request?.http || "na", null, 2)}`);
        // this.logger.withContext("willSendResponse")
        //   .log(context);
      },
    };
  }
}