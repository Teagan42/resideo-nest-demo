import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export abstract class BaseGuard<TRequest = any>
  implements CanActivate {
  canActivate = (context: ExecutionContext): boolean =>
    this.handleRequest(this.getRequest(context));

  protected getRequest(context: ExecutionContext): TRequest {
    return context.switchToHttp()
                  .getRequest() as TRequest;
  }

  protected abstract handleRequest(request: TRequest): boolean;
}

@Injectable()
export class AuthGuard extends BaseGuard {
  protected handleRequest(req) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return true;
  }
}

@Injectable()
export class GqlAuthGuard extends AuthGuard {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
