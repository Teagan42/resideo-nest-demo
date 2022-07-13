import {
  DynamicModule,
  Module,
} from '@nestjs/common';
import { LoggerProvider } from './logger.provider';
import { LoggerService } from './logger.service';

@Module({})
export class LoggerModule {
  public static build(context: string): DynamicModule {
    return {
      global: true,
      module: LoggerModule,
      providers: [
        LoggerProvider(context),
        LoggerService,
      ],
      exports: [
        LoggerService,
      ],
    };
  }
}
