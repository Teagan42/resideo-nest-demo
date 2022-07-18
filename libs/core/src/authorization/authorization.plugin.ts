import {Plugin} from "@nestjs/apollo";
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestListener,
  GraphQLServerListener,
  GraphQLServiceContext
} from "apollo-server-plugin-base";
import {LoggerService} from "@resideo-nest/core";
import {Inject} from "@nestjs/common";
import {debase, isBase64} from "@resideo-nest/core/helpers";

export const AUTH_PLUGIN_DELEGATE = Symbol("Delegate plugin for authorization");

@Plugin()
export class AuthorizationPlugin implements ApolloServerPlugin {
  constructor(
    private readonly logger: LoggerService,
    @Inject(AUTH_PLUGIN_DELEGATE) private readonly delegate: ApolloServerPlugin,
  ) {
    this.logger.setContext("AuthorizationPlugin");
  }

  async requestDidStart(
    requestContext: GraphQLRequestContext<BaseContext>
  ): Promise<GraphQLRequestListener<BaseContext> | void> {
    if (this.delegate.requestDidStart) {
      if (requestContext.context["claims"] && isBase64(requestContext.context["claims"])) {
        requestContext.context["claims"] = debase(requestContext.context["claims"]).split(" ");
      }
      return await this.delegate.requestDidStart(requestContext);
    }
    return;
  }

  async serverWillStart(
    service: GraphQLServiceContext
  ): Promise<GraphQLServerListener | void> {
    this.logger.log("serverWillStart");
    if (this.delegate.serverWillStart) {
      return await this.delegate.serverWillStart(service);
    }
    return
  }
}
