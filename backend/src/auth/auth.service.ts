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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login({ username, id, role }: User): Promise<LoginResponse> {
    const payload = { username, id, role };

    return {
      accessToken: this.jwtService.sign(payload),
      username,
      role,
    };
  }

  async register(userData: RegisterInput): Promise<User> {
    return this.usersService.create(userData);
  }
}
