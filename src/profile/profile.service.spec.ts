// src/profile/profile.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProfileService', () => {
  let service: ProfileService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateProfile', () => {
    it('should update username successfully', async () => {
      const updateProfileDto = { username: 'newUsername' };
      const userId = 1;

      // Mock prisma to return user
      mockPrismaService.user.findUnique.mockResolvedValue(null); // User not found by username
      mockPrismaService.user.update.mockResolvedValue({
        id: userId,
        username: updateProfileDto.username,
      });

      const result = await service.updateProfile(userId, updateProfileDto);
      expect(result).toBeDefined();
      expect(result.username).toBe(updateProfileDto.username);
    });

    it('should throw error if username is already taken', async () => {
      const updateProfileDto = { username: 'takenUsername' };
      const userId = 1;

      // Mock prisma to return a user already existing with the same username
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 2,
        username: 'takenUsername',
      });

      await expect(
        service.updateProfile(userId, updateProfileDto),
      ).rejects.toThrowError('Username already taken');
    });

    it('should return null if no username provided', async () => {
      const updateProfileDto = {};
      const userId = 1;

      const result = await service.updateProfile(userId, updateProfileDto);
      expect(result).toBeNull();
    });
  });
});
