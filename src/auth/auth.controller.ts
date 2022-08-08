import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(201)
  signup(@Body() dto: CreateUserDto): Promise<User | void> {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('login')
  login(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @Post('refresh')
  refresh() {
    return this.authService.refresh();
  }
}
