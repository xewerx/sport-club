import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClubEntity } from './clubs.entity';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(ClubEntity)
    private clubRepository: Repository<ClubEntity>,
  ) {}

  async getClubs(owner: string): Promise<ClubEntity[]> {
    return await this.clubRepository.find();
    // TODO
    // return this.clubRepository.find({ where: { owner: { username: owner } } });
  }
}
