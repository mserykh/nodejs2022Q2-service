import { ForbiddenException, Injectable } from '@nestjs/common';
import { genSalt, hash, compare }  from 'bcrypt';
import 'dotenv/config';

import { CreateUserDto } from 'src/user/dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto): Promise<User | void> {
    const hashPassword = await this.hashData(dto.password);

    const user = await this.userService.createUser({
      login: dto.login,
      password: hashPassword,
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
    const salt = await genSalt(saltRounds);
    const hashPassword = await hash(data, salt);

    return hashPassword;
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

    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches)
      throw new ForbiddenException(
        'Incorrect credentials. Please check the password',
      );

    return user;
  }
}
