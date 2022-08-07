import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() dto: CreateUserDto ) {
    return await this.authService.signup(dto);
  }

  @Post('login')
  login() {
    return this.authService.login();
  }

  @Post('refresh')
  refresh() {
    return this.authService.refresh();
  }
}
