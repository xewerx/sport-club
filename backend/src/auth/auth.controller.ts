import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { exceptionHandler } from 'src/utils/exceptionHandler';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginReq, ProfileReq, RegisterReq } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Request() req: RegisterReq) {
    return exceptionHandler(() => {
      return this.authService.register(req.body);
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: LoginReq) {
    return exceptionHandler(() => {
      return this.authService.login(req.user);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: ProfileReq) {
    return exceptionHandler(() => {
      return req.user;
    });
  }
}
