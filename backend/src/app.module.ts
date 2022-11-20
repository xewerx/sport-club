import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubsModule } from './clubs/clubs.module';
import { CompetitionModule } from './competition/competition.module';
import { ResultsModule } from './results/results.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ClubsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'sportDB.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CompetitionModule,
    ResultsModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
