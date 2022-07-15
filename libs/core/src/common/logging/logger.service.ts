import {
  ConsoleLogger,
  Inject,
  Injectable,
  LoggerService as LoggingService,
  Scope,
} from '@nestjs/common';
import { LOGGER_CONTEXT } from './logger.provider';

@Injectable(
  {
    scope: Scope.TRANSIENT,
  },
)
export class LoggerService
  extends ConsoleLogger
  implements LoggingService {
  constructor(
    @Inject(LOGGER_CONTEXT) rootContext: string,
  ) {
    super(rootContext);
  }

  withContext(context: string): this {
    this.setContext(context);
    return this;
  }

  log(
    message: any,
    ...optionalParams
  ) {
    super.log(
      typeof message === 'string'
      ? message
      : JSON.stringify(
        message,
        null,
        2,
      ),
      ...optionalParams,
    );
  }

  error(
    message: any,
    ...optionalParams
  ) {
    super.error(
      typeof message === 'string'
      ? message
      : JSON.stringify(message),
      ...optionalParams,
    );
  }

  warn(
    message: any,
    ...optionalParams
  ) {
    super.warn(
      typeof message === 'string'
      ? message
      : JSON.stringify(message),
      ...optionalParams,
    );
  }

  debug(
    message: any,
    ...optionalParams
  ) {
    super.debug(
      typeof message === 'string'
      ? message
      : JSON.stringify(message),
      ...optionalParams,
    );
  }

  setContext(context: string) {
    super.setContext(`${this.context}::${context}`);
  }

  resetContext() {
    super.resetContext();
    return this;
  }
}
