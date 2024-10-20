import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { AuthService } from '../auth.service';
import { AdminController } from '../admin.controller';
import { Role } from '../enums/role.enum';
import { PrismaService } from '../../prisma/prisma.service';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let jwtService: JwtService;
  let reflector: Reflector;
  let mockContext: ExecutionContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        JwtService,
        Reflector,
        AuthService,
        PrismaService,
      ],
      controllers: [AdminController], // Include AdminController in case we need it for the tests
    }).compile();

    rolesGuard = module.get<RolesGuard>(RolesGuard);
    jwtService = module.get<JwtService>(JwtService);
    reflector = module.get<Reflector>(Reflector);
  });

  describe('canActivate', () => {
    it('should return true for an admin user with correct role', async () => {
      const mockAdminJwtPayload = {
        sub: 1,
        username: 'adminuser',
        role: Role.ADMIN, // Admin role
      };

      jest.spyOn(jwtService, 'verify').mockReturnValue(mockAdminJwtPayload);

      mockContext = {
        switchToHttp: jest.fn().mockReturnThis(),
        getRequest: jest.fn().mockReturnValue({
          headers: { authorization: 'Bearer mocked-token' },
        }),
        getHandler: jest.fn().mockReturnValue({
          roles: [Role.ADMIN], // Endpoint requires ADMIN role
        }),
      } as any;

      const result = await rolesGuard.canActivate(mockContext);
      expect(result).toBe(true); // Should allow access for admin
    });

    it('should deny access for user without correct role', async () => {
      const mockUserJwtPayload = {
        sub: 2,
        username: 'normaluser',
        role: Role.USER, // User role
      };

      jest.spyOn(jwtService, 'verify').mockReturnValue(mockUserJwtPayload);

      mockContext = {
        switchToHttp: jest.fn().mockReturnThis(),
        getRequest: jest.fn().mockReturnValue({
          headers: { authorization: 'Bearer mocked-token' },
        }),
        getHandler: jest.fn().mockReturnValue({
          roles: [Role.ADMIN], // Endpoint requires ADMIN role, but user is not admin
        }),
      } as any;

      try {
        await rolesGuard.canActivate(mockContext);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
        expect(error.response.message).toBe('Forbidden resource');
      }
    });

    it('should deny access when no authorization token is provided', async () => {
      mockContext = {
        switchToHttp: jest.fn().mockReturnThis(),
        getRequest: jest.fn().mockReturnValue({
          headers: {}, // No token provided
        }),
        getHandler: jest.fn().mockReturnValue({
          roles: [Role.ADMIN], // Endpoint requires ADMIN role
        }),
      } as any;

      try {
        await rolesGuard.canActivate(mockContext);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
        expect(error.response.message).toBe('Forbidden resource');
      }
    });
  });
});
