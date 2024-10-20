import {
  Controller,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';

@Controller('admin/users')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.ADMIN)
  async findAllUsers() {
    return this.userService.findAll();
  }

  @Put(':id/role')
  @Roles(Role.ADMIN)
  async updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userService.updateRole(id, updateUserRoleDto);
  }
}
