import { ClubEntity } from 'src/clubs/clubs.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  avatar: string;

  // only for atheletes
  @Column({ nullable: true })
  coach: number;

  // only for atheletes
  @ManyToOne(() => ClubEntity, (club) => club.members)
  club: ClubEntity;
}
