import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { exceptionHandler } from 'src/utils/exceptionHandler';
import { CompetitionService } from './competition.service';
import { SetCompetitionReq } from './types';

@Controller('competition')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @Post('/')
  async addCompetition(@Request() req: SetCompetitionReq) {
    return exceptionHandler(async () => {
      console.log(req.body);
      return this.competitionService.create(req.body.competition, 1);
    });
  }
}
