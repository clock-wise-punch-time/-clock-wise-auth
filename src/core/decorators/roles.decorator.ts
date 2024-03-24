import { SetMetadata } from '@nestjs/common/decorators/core/set-metadata.decorator';
import { Roles as RoleTypes } from 'src/domain/types/roles';

export const ROLES_KEY = 'ROLES';
export const Roles = (rolesList: RoleTypes[]) =>
  SetMetadata(ROLES_KEY, rolesList);
