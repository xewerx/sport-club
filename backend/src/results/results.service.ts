import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResultEntity } from './result.entity';
import { Result } from './types';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(ResultEntity)
    private resultRepository: Repository<ResultEntity>,
  ) {}

  async create({ score, rating, competition, athlete }: Result) {
    if (rating < 1 || rating > 10) throw new Error('Wrong rating!');
    this.resultRepository.save({
      score,
      rating,
      competition,
      athlete,
    });
  }

  async update(id: number, score: string, rating: number) {
    if (rating < 1 || rating > 10) throw new Error('Wrong rating!');
    return this.resultRepository.update({ id }, { score, rating });
  }

  async findByAthleteId(athleteId: number) {
    const results = await this.resultRepository.find({
      relations: {
        competition: true,
      },
      where: { athlete: { id: athleteId } },
    });

    return results;
  }

  async findByCompetition(competitionId: number) {
    const results = await this.resultRepository.find({
      relations: {
        athlete: true,
      },
      where: { competition: { id: competitionId } },
    });

    return results.map((result) => ({
      ...result,
      athlete: {
        id: result.athlete.id,
        username: result.athlete.username,
      },
    }));
  }
}
