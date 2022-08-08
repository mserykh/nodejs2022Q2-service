import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { CreateUserDto } from 'src/user/dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signup(dto: CreateUserDto) {
    const saltRounds = Number(process.env.CRYPT_SALT);
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(dto.password, salt);
    
    const user = this.userService.createUser({
      login: dto.login,
      password: hash,
    });

    return user;
  }

  login() {}

  refresh() {}
}
