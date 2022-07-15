import { HttpModule } from '@nestjs/axios';
import {
  DynamicModule,
  Module,
} from '@nestjs/common';
import { LoggerModule } from '@resideo-nest/core';

import {
  CONTEXT_DATA,
  ContextData,
} from './context.data';
import { RemoteDataSourceFactory } from './context.remote';
import { ContextService } from './context.service';

@Module({})
export class ContextModule {
  static register(userId: string): DynamicModule {
    return {
      global: true,
      module: ContextModule,
      imports: [
        HttpModule,
        LoggerModule.build('Context'),
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
