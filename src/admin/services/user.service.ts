// src/admin/services/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async updateRole(
    id: number,
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { role: updateUserRoleDto.role },
    });
  }
}
