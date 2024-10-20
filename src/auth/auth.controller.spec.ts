import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ForbiddenException } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';
import { Role } from './enums/role.enum';
import { AdminController } from './admin.controller';

describe('Authorization and Roles', () => {
  let authController: AuthController;
  let adminController: AdminController;
  let jwtService: JwtService;
  let authService: AuthService;
  let uniqueUsername: string;

  const generateUniqueUsername = () => `testuser-${Date.now()}`;

  beforeEach(async () => {
    uniqueUsername = generateUniqueUsername();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController, AdminController], // Register both controllers
      providers: [
        AuthService,
        PrismaService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-token'),
            verify: jest
              .fn()
              .mockReturnValue({ sub: 1, username: 'testuser', role: 'user' }), // Mock JWT verification
          },
        },
      ],
    }).compile();

    // Use correct module.get to get the instances
    authController = module.get<AuthController>(AuthController);
    adminController = module.get<AdminController>(AdminController); // Ensure adminController is retrieved
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);

    // Mock bcrypt methods
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation((password: string) =>
        Promise.resolve(`hashed-${password}`),
      );

    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation((password: string, hash: string) =>
        Promise.resolve(password === hash.replace('hashed-', '')),
      );
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(adminController).toBeDefined();
  });

  it('should register a new user', async () => {
    const registerDto = {
      username: uniqueUsername,
      password: 'password123',
    };

    const result = await authController.register(registerDto);

    expect(result).toHaveProperty('username', uniqueUsername);
    expect(result).toHaveProperty('access_token');
  });

  it('should login with valid credentials', async () => {
    const hashedPassword = 'hashed-password123';

    const mockUser = {
      id: 1,
      username: uniqueUsername,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      cartId: 123,
    };

    jest
      .spyOn(authService['prisma'].user, 'findUnique')
      .mockResolvedValue(mockUser);

    const loginDto = {
      username: uniqueUsername,
      password: 'password123',
    };

    const result = await authController.login(loginDto);

    expect(result).toHaveProperty('access_token');
  });

  // Authorization Tests
  describe('Admin dashboard', () => {
    it('should allow access to admin dashboard for admin role', async () => {
      const mockAdminJwtPayload = {
        sub: 1,
        username: 'adminuser',
        role: Role.ADMIN,
      };

      jest.spyOn(jwtService, 'verify').mockReturnValue(mockAdminJwtPayload);

      const result = await adminController.getDashboard();

      expect(result).toEqual({ message: 'Welcome to the admin dashboard' });
    });

    it('should deny access to admin dashboard for user role', async () => {
      const mockUserJwtPayload = {
        sub: 2,
        username: 'normaluser',
        role: Role.USER,
      };

      jest.spyOn(jwtService, 'verify').mockReturnValue(mockUserJwtPayload);

      try {
        await adminController.getDashboard();
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
        expect(error.response.message).toBe('Forbidden resource');
      }
    });

    it('should deny access to admin dashboard without authorization token', async () => {
      try {
        await adminController.getDashboard();
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
        expect(error.response.message).toBe('Forbidden resource');
      }
    });
  });
});
