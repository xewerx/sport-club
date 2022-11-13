import { Controller, Get, Patch, Post, Request } from '@nestjs/common';
import { exceptionHandler } from 'src/utils/exceptionHandler';
import { Coach, SetAvatarReq, SetClubReq } from './types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('coaches')
  async getCoaches(): Promise<Coach[]> {
    return exceptionHandler(async () => {
      const coaches = await this.userService.getCoaches();
      return coaches.map((coach) => ({
        ...coach,
        password: undefined,
      }));
    });
  }

  @Patch('club')
  async setClub(@Request() req: SetClubReq) {
    return exceptionHandler(async () => {
      console.log(req.body);
      return this.userService.setClub(req.body.userId, req.body.clubId);
    });
  }

  @Post('avatar')
  async setAvatar(@Request() req: SetAvatarReq) {
    return exceptionHandler(async () => {
      console.log(req.body);
      return this.userService.setAvatar(req.body.userId, req.body.avatar);
    });
  }
}
