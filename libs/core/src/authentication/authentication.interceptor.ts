import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { LoggerService } from '@resideo-nest/core';
import {debase} from "@resideo-nest/core/helpers";

@Injectable()
export class AuthenticationInterceptor
  implements NestInterceptor {

  constructor(
    private readonly logger: LoggerService,
  ) {
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ) {
    const gqlContext = GqlExecutionContext.create(context);
    this.logger.log(gqlContext.getContext().req.headers['user-id']);
    this.logger.log(gqlContext.getContext().req.headers);
    this.logger.log(gqlContext.getArgs());
    this.logger.log(debase(gqlContext.getContext().req.headers['claims']));
    return next.handle()
               .pipe();
  }

}
