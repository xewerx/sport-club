import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserInput } from './types';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(username: string): Promise<UserEntity | undefined> {
    return (
      await this.userRepository.find({
        relations: {
          club: true,
        },
        where: {
          username,
        },
      })
    )[0];
  }

  async create(userData: UserInput): Promise<UserEntity> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = await this.userRepository.save({
      ...userData,
      password: hashedPassword,
    });

    return user;
  }

  async getCoaches(): Promise<UserEntity[]> {
    return this.userRepository.findBy({ role: 'Trener' });
  }

  async getAthletes(coach: string): Promise<UserEntity[]> {
    return this.userRepository.findBy({ coach });
  }

  async setClub(userId: number, clubId: number) {
    return this.userRepository.update({ id: userId }, { club: { id: clubId } });
  }

  async setAvatar(userId: number, avatarBase64: string) {
    return this.userRepository.update({ id: userId }, { avatar: avatarBase64 });
  }
}
