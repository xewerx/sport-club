import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultsService } from 'src/results/results.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CompetitionEntity } from './competition.entity';
import { Competition } from './types';

@Injectable()
export class CompetitionService {
  constructor(
    @InjectRepository(CompetitionEntity)
    private competitionRepository: Repository<CompetitionEntity>,
    private readonly resultService: ResultsService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    { description, date, time, results }: Competition,
    creatorId: number,
  ) {
    const coach = await this.usersService.getUser(creatorId);
    // TODO should be transactional write
    const competition = await this.competitionRepository.save({
      description,
      date,
      time,
      creator: coach,
    });

    const resultPromises = results.map(async ({ rating, score, athleteId }) => {
      const athlete = await this.usersService.getUser(athleteId);
      this.resultService.create({
        score,
        rating,
        competition: competition,
        athlete,
      });
    });
    await Promise.all(resultPromises);

    return competition;
  }

  async find(coachUsername: string) {
    const coach = await this.usersService.findOne(coachUsername);
    const competitions = await this.competitionRepository.findBy({
      creator: coach,
    });

    const competitionWithResultsPromise = competitions.map(
      async (competition) => ({
        ...competition,
        results: await this.resultService.findByCompetition(competition.id),
      }),
    );

    const competitionWithResults = await Promise.all(
      competitionWithResultsPromise,
    );

    return competitionWithResults;
  }
}
