import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultEntity } from './result.entity';
import { ResultsService } from './results.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResultEntity])],
  providers: [ResultsService],
  exports: [ResultsService],
})
export class ResultsModule {}
