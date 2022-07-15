import { HttpModule } from '@nestjs/axios';
import {
  DynamicModule,
  Module,
} from '@nestjs/common';

import {
  CONTEXT_DATA,
  ContextData,
  ContextService,
  LoggerModule,
  toId,
} from '@resideo-nest/core';

import { RemoteDataSourceFactory } from './context.remote';
import { ContextService } from './context.service';
import {GraphQLRequestModule} from "@golevelup/nestjs-graphql-request";

@Module({})
export class ContextModule {
  static register(userId: string): DynamicModule {
    return {
      global: true,
      module: ContextModule,
      imports: [
        HttpModule,
        LoggerModule.build('Context'),
        GraphQLRequestModule.forRoot(GraphQLRequestModule, {
          // Exposes configuration options based on the graphql-request package
          endpoint: "http://localhost:3000/graphql",
          options: {
            headers: {
              'content-type': 'application/json',
              'user-id': toId(
                'User',
                '42',
              )
            },
          },
        }),
      ],
      providers: [
        {
          provide: CONTEXT_DATA,
          useValue: userId,
        },
        ContextData,
        RemoteDataSourceFactory,
        ContextService,
      ],
      exports: [
        CONTEXT_DATA,
        ContextData,
        HttpModule,
        RemoteDataSourceFactory,
        ContextService,
      ],
    };
  }
}
