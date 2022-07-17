import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
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
    const result = await this.userService.getUsers();
    return result;
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const result = await this.userService.createUser(dto);
    return result;
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<User> {
    const result = await this.userService.getUserById(id);
    return result;
  }

  @Put(':id')
  async editUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdatePasswordDto,
  ): Promise<User> {
    const result = await this.userService.editUser(id, dto);
    return result;
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete(':id')
  async deleteUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    const result = this.userService.deleteUser(id);
    return result;
  }
}
