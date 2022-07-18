import {
  DynamicModule, LogLevel,
  Module,
} from '@nestjs/common';
import {LoggerContextProvider, LoggerLevelProvider} from './logger.provider';
import { LoggerService } from './logger.service';

const DEFAULT_LOG_LEVELS: LogLevel[] = [
  'log',
  'error',
  'warn',
  'debug',
  'verbose',
];

@Module({})
export class LoggerModule {
  public static build(
    context: string,
    levels: LogLevel[] =  DEFAULT_LOG_LEVELS
  ): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        LoggerContextProvider(context),
        LoggerLevelProvider(levels),
        LoggerService,
      ],
      exports: [
        LoggerService,
      ],
    };
  }
}
