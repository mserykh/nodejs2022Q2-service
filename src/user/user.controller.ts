import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common';
import { STATUS_CODES } from 'http';
import { StatusCodes } from 'http-status-codes';

import { User } from 'src/db/db.schema';
import { UpdatePasswordDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Put(':id')
  async editUser(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto,
  ): Promise<User> {
    return await this.userService.editUser(id, dto);
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
