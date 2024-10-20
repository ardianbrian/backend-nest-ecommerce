import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ForbiddenException } from '@nestjs/common';
import { Role } from '../auth/enums/role.enum';

describe('ProfileController', () => {
  let controller: ProfileController;

  const mockUser = {
    id: 1,
    username: 'testuser',
    password: 'hashed-password', // Menambahkan password
    role: Role.USER, // Role yang valid
    createdAt: new Date(), // Waktu pembuatan user
    updatedAt: new Date(), // Waktu update terakhir
    cartId: 123, // ID keranjang
  };

  const mockProfileService = {
    updateProfile: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn().mockReturnValue(mockUser), // Mocking verify method to return the mock user
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        ProfileService,
        { provide: PrismaService, useValue: {} },
        { provide: ProfileService, useValue: mockProfileService },
        { provide: JwtService, useValue: mockJwtService }, // Mock JwtService
        { provide: JwtAuthGuard, useValue: {} }, // Mock JWT guard
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('updateProfile', () => {
    it('should throw ForbiddenException if user is unauthorized (e.g. not logged in)', async () => {
      const updateProfileDto = { username: 'newUsername' };

      // Simulate unauthorized user (passing null or undefined as user)
      await expect(
        controller.updateProfile(updateProfileDto, null), // Simulating a null user
      ).rejects.toThrowError(ForbiddenException);
    });
  });
});
