// profile.controller.ts

import {
  Controller,
  Body,
  Put,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @GetUser() user: any,
  ) {
    if (!user) {
      throw new ForbiddenException('Unauthorized');
    }

    const updatedUser = await this.profileService.updateProfile(
      user.id,
      updateProfileDto,
    );
    if (!updatedUser) {
      return { message: 'No changes made' };
    }

    return { message: 'Profile updated successfully', user: updatedUser };
  }
}
