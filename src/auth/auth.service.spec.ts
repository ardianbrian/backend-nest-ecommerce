// src/auth/auth.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {}, // Mock PrismaService if needed
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a new user', async () => {
    const registerDto = { username: 'testuser', password: 'password123' };
    const mockRegisterResult = {
      id: 1,
      username: 'testuser',
      access_token: 'mockedJwtToken',
    };

    jest.spyOn(authService, 'register').mockResolvedValue(mockRegisterResult);

    const result = await controller.register(registerDto);

    expect(result).toEqual(mockRegisterResult);
    expect(authService.register).toHaveBeenCalledWith(registerDto); // Assert the register method was called with correct args
  });

  it('should login with valid credentials', async () => {
    const loginDto = { username: 'testuser', password: 'password123' };
    const mockLoginResult = { access_token: 'mockedJwtToken' };

    jest.spyOn(authService, 'login').mockResolvedValue(mockLoginResult);

    const result = await controller.login(loginDto);

    expect(result).toEqual(mockLoginResult);
    expect(authService.login).toHaveBeenCalledWith(loginDto); // Assert the login method was called with correct args
  });
});
