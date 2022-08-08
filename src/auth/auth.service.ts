import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { CreateUserDto } from 'src/user/dto';
import { User, UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signup(dto: CreateUserDto): Promise<User | void> {
    const hash = await this.hashData(dto.password);

    const user = await this.userService.createUser({
      login: dto.login,
      password: hash,
    });

    return user;
  }

  async login(dto: CreateUserDto): Promise<Tokens> {
    const user = await this.validateUser(dto);

    const tokens = await this.getTokens(user.id, user.login);

    return tokens;
  }

  async refresh() {}

  async hashData(data: string) {
    const saltRounds = Number(process.env.CRYPT_SALT);
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(data, salt);

    return hash;
  }

  async getTokens(userId: string, login: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: jwtConstants.accessToken.secret,
          expiresIn: jwtConstants.accessToken.expiresIn,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: jwtConstants.refreshToken.secret,
          expiresIn: jwtConstants.refreshToken.expiresIn,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async validateUser(dto: CreateUserDto) {
    const { password, login } = dto;

    const user = await this.userService.getUserByLogin(login);
    if (!user)
      throw new ForbiddenException('Incorrect credentials. No such user');

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      throw new ForbiddenException(
        'Incorrect credentials. Please check hte password',
      );

    return user;
  }
}
