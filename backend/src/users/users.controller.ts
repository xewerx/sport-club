import {
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { exceptionHandler } from 'src/utils/exceptionHandler';
import {
  Athlete,
  Coach,
  GetAthletesQuery,
  SetAvatarReq,
  SetClubReq,
} from './types';
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
        avatar: undefined,
      }));
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('athletes')
  async getAthletes(@Query() query: GetAthletesQuery): Promise<Athlete[]> {
    return exceptionHandler(async () => {
      const coaches = await this.userService.getAthletes(query.coach);
      return coaches.map((athlete) => ({
        ...athlete,
        password: undefined,
        avatar: undefined,
      }));
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('club')
  async setClub(@Request() req: SetClubReq) {
    return exceptionHandler(async () => {
      console.log(req.body);
      return this.userService.setClub(req.body.userId, req.body.clubId);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  async setAvatar(@Request() req: SetAvatarReq) {
    return exceptionHandler(async () => {
      console.log(req.body);
      return this.userService.setAvatar(req.body.userId, req.body.avatar);
    });
  }
}
