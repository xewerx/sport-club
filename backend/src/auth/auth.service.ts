/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  LoginResponse,
  RegisterInput,
  User,
  UserWithoutPassword,
} from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.usersService.findOne(username);

    if (user && bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login({
    username,
    id,
    role,
    coach,
    club,
    avatar,
  }: User): Promise<LoginResponse> {
    const payload = { username, id, role };

    return {
      accessToken: this.jwtService.sign(payload),
      id,
      username,
      role,
      coach,
      avatar,
      clubName: club?.name ?? null,
    };
  }

  async register(userData: RegisterInput): Promise<LoginResponse> {
    const user = await this.usersService.create(userData);
    const { password, club, ...result } = user;

    return {
      ...result,
      accessToken: this.jwtService.sign(result),
      clubName: null,
    };
  }
}
