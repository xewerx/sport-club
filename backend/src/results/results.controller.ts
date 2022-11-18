import {
  Controller,
  Get,
  Patch,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { exceptionHandler } from 'src/utils/exceptionHandler';
import { ResultsService } from './results.service';
import { GetResultsQuery, UpdateResultReq } from './types';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getResults(@Query() query: GetResultsQuery) {
    return exceptionHandler(async () => {
      return this.resultsService.findByAthleteId(query.athleteId);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/')
  async updateResult(@Request() req: UpdateResultReq) {
    return exceptionHandler(async () => {
      console.log(req);
      return this.resultsService.update(
        req.body.id,
        req.body.score,
        req.body.rating,
      );
    });
  }
}
