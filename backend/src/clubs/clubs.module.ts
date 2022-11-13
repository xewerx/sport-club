import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubsController } from './clubs.controller';
import { ClubEntity } from './clubs.entity';
import { ClubsService } from './clubs.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity])],
  providers: [ClubsService],
  exports: [ClubsService],
  controllers: [ClubsController],
})
export class ClubsModule {}
