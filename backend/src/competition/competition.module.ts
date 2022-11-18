import { Module } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { CompetitionController } from './competition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionEntity } from './competition.entity';
import { ResultsModule } from 'src/results/results.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompetitionEntity]),
    ResultsModule,
    UsersModule,
  ],
  providers: [CompetitionService],
  controllers: [CompetitionController],
})
export class CompetitionModule {}
