import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/users/users.entity';

@Entity()
export class CompetitionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column()
  time: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  creator: number;
}
