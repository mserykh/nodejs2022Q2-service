import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';

import { Repository } from 'typeorm';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { User, UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    const users = await this.usersRepository.find();
    return users;
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id ${id} does not exist`);

    const result = plainToInstance(User, user);

    return result;
  }

  async createUser(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);
    const newUser = this.usersRepository.save(user);
    const result = plainToInstance(User, newUser);

    return result;
  }

  async editUser(id: string, dto: UpdatePasswordDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id ${id} does not exist`);

    if (user.password !== dto.oldPassword)
      throw new ForbiddenException(
        'Provided password is not correct. Cannot update password',
      );

    await this.usersRepository.update(id, { password: dto.newPassword });
    const updatedUser = await this.getUserById(id);
    const result = plainToInstance(User, updatedUser);

    return result;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id ${id} does not exist`);

    await this.usersRepository.delete({ id });

    return null;
  }
}
