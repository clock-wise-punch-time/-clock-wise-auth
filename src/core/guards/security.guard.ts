import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class SecurityGuard extends AuthGuard("jwt") implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    this.isPublicRouter(this.reflector, context);
    return true;
  }

  isPublicRouter(reflector: Reflector, context: ExecutionContext) {
    const routerIsPublic = reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (routerIsPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
