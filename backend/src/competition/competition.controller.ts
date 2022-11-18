import {
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetAthletesQuery } from 'src/users/types';
import { exceptionHandler } from 'src/utils/exceptionHandler';
import { CompetitionService } from './competition.service';
import { SetCompetitionReq } from './types';

@Controller('competition')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async addCompetition(@Request() req: SetCompetitionReq) {
    return exceptionHandler(async () => {
      console.log(req.body);
      return this.competitionService.create(req.body.competition, 1);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getCompetition(@Query() query: GetAthletesQuery) {
    return exceptionHandler(async () => {
      return this.competitionService.find(query.coach);
    });
  }
}
