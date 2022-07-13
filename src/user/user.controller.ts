import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { User } from 'src/db/db.schema';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<Partial<User>[]> {
    return await this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
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
