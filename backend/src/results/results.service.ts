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
    this.resultRepository.save({
      score,
      rating,
      competition,
      athlete,
    });
  }
}
