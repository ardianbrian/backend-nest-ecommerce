import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true; // If no roles are required, let the request proceed
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('Authorization token missing');
    }

    let decoded;
    try {
      decoded = this.jwtService.verify(token); // Decode the token
    } catch (error) {
      throw new ForbiddenException('Invalid or expired token');
    }

    const user = decoded as User;
    if (!user || !user.role) {
      throw new ForbiddenException('Invalid token payload');
    }

    // Check if the user's role matches any of the required roles
    const hasRole = roles.some((role) => user.role === role);
    if (!hasRole) {
      throw new ForbiddenException('Forbidden resource');
    }

    return true; // Role is valid, allow the request to continue
  }
}
