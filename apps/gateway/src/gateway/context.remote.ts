import {
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

  async willSendRequest(
    {
      request,
      context,
    },
  ) {
    this.logger.log(`Request: ${request}`);
    this.logger.log(`Context: ${context}`);
    if (!this.contextService.isBusy && !request.http.headers.has("m2m") && !request?.request?.query?.includes("__ApolloGetServiceDefinition__")) {
      this.logger.log("Retrieving claims");
      const ctx = await this.contextService.retrieveUserClaims();
      this.logger.log(this.contextService.userContextData);
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
      base(context.claims || ''),
    );

    this.logger.log(request.http.headers);
  }
}
