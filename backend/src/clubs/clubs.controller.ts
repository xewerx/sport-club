import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { exceptionHandler } from 'src/utils/exceptionHandler';
import { ClubsService } from './clubs.service';
import { GetClubsParams } from './types';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':owner')
  async getClubsById(@Param() params: GetClubsParams) {
    return exceptionHandler(() => {
      return this.clubsService.getClubs(params.owner);
    });
  }
}
