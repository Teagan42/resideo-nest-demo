import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { LoggerService } from '@resideo-nest/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: LoggerService,
  ) {
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> {
    const now = Date.now();

    return next
      .handle()
      .pipe(
        // tap(() => this.logger.log(`ExecutionTime: ${Date.now() -  now}ms`))
      )
  }
}
