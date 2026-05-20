import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Inject,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';

import { ROLE_REPOSITORY } from 'src/application/tokens';

import type { RoleRepository } from 'src/domain/repositories/role.repository.port';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,

    @Inject(ROLE_REPOSITORY)
    private readonly roleRepo: RoleRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Si la ruta no requiere roles
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (!user.roleId) {
      throw new ForbiddenException(
        'User token does not contain roleId',
      );
    }

    // Buscar el rol asociado al roleId
    const role = await this.roleRepo.findRoleById(user.roleId);

    if (!role) {
      throw new ForbiddenException('Role not found');
    }

    // Validar usando el nombre del rol
    const hasPermission = requiredRoles.includes(role.name);

    if (!hasPermission) {
      throw new ForbiddenException(
        `Access denied for role: ${role.name}`,
      );
    }

    return true;
  }
}