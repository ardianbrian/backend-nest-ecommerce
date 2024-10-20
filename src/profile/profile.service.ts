// src/profile/profile.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
    const { username } = updateProfileDto;

    // Periksa apakah ada username yang diberikan
    if (username) {
      const existingUser = await this.prisma.user.findUnique({
        where: { username },
      });

      if (existingUser) {
        throw new NotFoundException('Username already taken');
      }

      // Update username
      return await this.prisma.user.update({
        where: { id: userId },
        data: { username },
      });
    }

    return null; // Jika tidak ada username, return null atau bisa ganti dengan logika lain
  }
}
