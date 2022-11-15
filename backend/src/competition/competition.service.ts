import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultsService } from 'src/results/results.service';
import { Repository } from 'typeorm';
import { CompetitionEntity } from './competition.entity';
import { Competition } from './types';

@Injectable()
export class CompetitionService {
  constructor(
    @InjectRepository(CompetitionEntity)
    private competitionRepository: Repository<CompetitionEntity>,
    private readonly resultService: ResultsService,
  ) {}

  async create(
    { description, date, time, results }: Competition,
    creatorId: number,
  ) {
    // TODO should be transactional write
    const competition = await this.competitionRepository.save({
      description,
      date,
      time,
      creator: creatorId,
    });
    console.log(competition.id);
    const resultPromises = results.map(({ rating, score, athleteId }) =>
      this.resultService.create({
        score,
        rating,
        competition: competition.id,
        athlete: athleteId,
      }),
    );
    await Promise.all(resultPromises);

    return competition;
  }
}
