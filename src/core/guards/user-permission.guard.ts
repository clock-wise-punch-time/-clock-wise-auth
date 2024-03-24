import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestUser } from 'src/core/types/request.types';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Roles } from 'src/domain/types/roles';

@Injectable()
export class UserPermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const role = this.getUserRole(context) as Roles;
    const routePermissions = this.checkRoutePermissions(
      this.reflector,
      context,
    );
    const isAllowed = this.checkUserRolesToAccessRoute(role, routePermissions);
    return isAllowed;
  }

  getUserRole(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestUser>();
    return request['user']?.role;
  }

  checkRoutePermissions(reflector: Reflector, context: ExecutionContext) {
    return reflector.get(ROLES_KEY, context.getHandler());
  }

  checkUserRolesToAccessRoute(role: Roles, allowedRoles?: Roles[]) {
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }
    return allowedRoles.includes(role);
  }
}
