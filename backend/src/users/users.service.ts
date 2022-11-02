import { Injectable } from '@nestjs/common';

export type User = {
  id: string;
  login: string;
  password: string;
};

@Injectable()
export class UsersService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async findOne(login: string): Promise<User | undefined> {
    return this.users.find((user) => user.login === login);
  }
}
