import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  tap,
  timeout,
} from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    // console.log('Before...');

    const now = Date.now();
    const result = await next
      .handle()
      .toPromise();

    // console.log(JSON.stringify(result, null, 2));

    return result;

  }
}
