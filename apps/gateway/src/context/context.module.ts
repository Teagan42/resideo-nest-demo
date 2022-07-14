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
import {
  CONTEXT_REMOTE,
  ContextRemoteDataSourceProvider,
} from './context.remote';
import { ContextService } from './context.service';

@Module({})
export class ContextModule {
  static register(userId: string): DynamicModule {
    const contextData = new ContextData(userId);
    return {
      module: ContextModule,
      imports: [
        HttpModule,
        LoggerModule.build('Context'),
      ],
      providers: [
        {
          provide: CONTEXT_DATA,
          useValue: contextData,
        },
        ContextRemoteDataSourceProvider,
        ContextService,
      ],
      exports: [
        CONTEXT_REMOTE,
        ContextService,
      ],
      global: true,
    };
  }
}
