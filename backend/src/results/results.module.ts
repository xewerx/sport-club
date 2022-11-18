import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultEntity } from './result.entity';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ResultEntity])],
  providers: [ResultsService],
  exports: [ResultsService],
  controllers: [ResultsController],
})
export class ResultsModule {}
