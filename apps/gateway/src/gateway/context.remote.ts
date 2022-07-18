import {
  GraphQLDataSourceProcessOptions,
  RemoteGraphQLDataSource,
  ServiceEndpointDefinition,
} from '@apollo/gateway';
import {
  Injectable,
} from '@nestjs/common';
import {
  ContextService,
  LoggerService,
} from '@resideo-nest/core';
import {base} from "@resideo-nest/core/helpers";
import {
  GraphQLRequestContext,
  GraphQLResponse,
} from 'apollo-server-plugin-base';

@Injectable()
export class RemoteDataSourceFactory {
  constructor(
    private readonly logger: LoggerService,
  ) {
  }

  public from(
    contextService: ContextService,
    serviceEndpoint: ServiceEndpointDefinition
  ): AuthenticatedRemoteDataSource {
    this.logger.log(`Creating Data Source ${serviceEndpoint.name} at ${serviceEndpoint.url}`);
    return new AuthenticatedRemoteDataSource(
      new LoggerService(`RemoteDataSource::${serviceEndpoint.name}`, ['log']),
      contextService,
      serviceEndpoint.name,
      serviceEndpoint.url,
    )
  }
}

@Injectable()
export class AuthenticatedRemoteDataSource
  extends RemoteGraphQLDataSource {

  constructor(
    private readonly logger: LoggerService,
    private readonly contextService: ContextService,
    private readonly name: string,
    url: string,
  ) {
    super(
      {
        url: url,
      },
    );
    this.logger.setContext("AuthenticatedDataSource");
  }

  async process(options: GraphQLDataSourceProcessOptions<Record<string, any>>): Promise<GraphQLResponse> {
    // this.logger.log(`process ${JSON.stringify(options.context, null, 2)}`)
    const result = await super.process(options);
    if (!result.data?._service && !options.request.http.headers.has("m2M")) {
      // this.logger.log(`operationName: ${options.request.operationName}`);
      // this.logger.log(options.request)
      // this.logger.log(JSON.stringify(
      //   result.data,
      //   null,
      //   2
      // ));
    }
    return result;
  }

  async willSendRequest({
                          request,
      context,
    },
  ) {
    // this.logger.log(`willSendRequest ${JSON.stringify(context, null, 2)}`)
    if (!this.contextService.isBusy && !request.http.headers.has("m2m") && !request?.request?.query?.includes("__ApolloGetServiceDefinition__")) {
      const ctx = await this.contextService.retrieveUserClaims();
      if (ctx) {
        context["userId"] = ctx.userId;
        context["claims"] = ctx.claims;
      }
      request.http.headers.set(
        'userId',
        context.userId,
      );
      request.http.headers.set(
        'claims',
        base((context.claims || []).join(" ")),
      );
    }
    // this.logger.log(request.http.headers);
    // this.logger.log(context);
  }
}
