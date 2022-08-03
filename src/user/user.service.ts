import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'crypto';

import { DbService } from 'src/db/db.service';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  async getUsers() {
    const users = await this.db.users.findMany();
    const result = users.map((user) => plainToInstance(User, user));

    return result;
  }

  async getUserById(id: string) {
    const user = await this.db.users.findUnique(id);
    if (!user) throw new NotFoundException(`User with id ${id} does not exist`);

    const result = plainToInstance(User, user);

    return result;
  }

  async createUser(dto: CreateUserDto) {
    const newUser = new User();

    newUser.id = randomUUID();
    newUser.login = dto.login;
    newUser.password = dto.password;
    newUser.createdAt = Date.now();
    newUser.updatedAt = Date.now();
    newUser.version = 1;

    const user = await this.db.users.create(newUser);
    const result = plainToInstance(User, user);

    return result;
  }

  async editUser(id: string, dto: UpdatePasswordDto) {
    const user = await this.db.users.findUnique(id);
    if (!user) throw new NotFoundException(`User with id ${id} does not exist`);

    if (user.password !== dto.oldPassword)
      throw new ForbiddenException(
        'Provided password is not correct. Cannot update password',
      );

    const updateUser = await this.db.users.update(id, dto);
    const result = plainToInstance(User, updateUser);

    return result;
  }

  async deleteUser(id: string) {
    const user = await this.db.users.findUnique(id);
    if (!user) throw new NotFoundException(`User with id ${id} does not exist`);

    const isDeleted = await this.db.users.delete(id);
    if (!isDeleted)
      throw new InternalServerErrorException(
        'Something went wrong. Try again later',
      );

    return null;
  }
}
