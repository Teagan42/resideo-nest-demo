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
import { GraphQLResponse } from 'apollo-server-plugin-base';

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
      new LoggerService(`RemoteDataSource::${serviceEndpoint.name}`),
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
  }

  async process(options: GraphQLDataSourceProcessOptions<Record<string, any>>): Promise<GraphQLResponse> {
    const result = await super.process(options);
    if (!result.data?._service) {
      this.logger.log(JSON.stringify(
        result,
        null,
        2
      ));
    }
    return result;
  }

  async willSendRequest({
                          request,
      context,
    },
  ) {
    if (!this.contextService.isBusy && !request.http.headers.has("m2m") && !request?.request?.query?.includes("__ApolloGetServiceDefinition__")) {
      const ctx = await this.contextService.retrieveUserClaims();
      if (ctx) {
        Object.assign(
          context,
          ctx
        );
      }
    }
    request.http.headers.set(
      'user-id',
      context.userId,
    );
    request.http.headers.set(
      'claims',
      base((context.claims || []).join(" ")),
    );
  }
}
