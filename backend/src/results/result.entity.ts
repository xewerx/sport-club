import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/users/users.entity';
import { CompetitionEntity } from 'src/competition/competition.entity';

@Entity()
export class ResultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: string;

  @Column()
  rating: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  athlete: number;

  @ManyToOne(() => CompetitionEntity, (competition) => competition.id)
  competition: number;
}
