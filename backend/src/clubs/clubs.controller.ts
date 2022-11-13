import { Controller, Get, Param } from '@nestjs/common';
import { exceptionHandler } from 'src/utils/exceptionHandler';
import { ClubsService } from './clubs.service';
import { GetClubsParams } from './types';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}
  @Get(':owner')
  async getClubsById(@Param() params: GetClubsParams) {
    return exceptionHandler(() => {
      return this.clubsService.getClubs(params.owner);
    });
  }
}
