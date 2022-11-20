import { ClubEntity } from 'src/clubs/clubs.entity';
import { CompetitionEntity } from 'src/competition/competition.entity';
import { MessageEntity } from 'src/messages/message.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

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
  coach: string;

  // only for atheletes
  @ManyToOne(() => ClubEntity, (club) => club.members)
  club: ClubEntity;

  // only for coaches
  @OneToMany(() => CompetitionEntity, (competition) => competition.creator)
  competitions: CompetitionEntity[];

  // only for atheletes
  @OneToMany(() => MessageEntity, (message) => message.recipient)
  messagesReceived: MessageEntity[];

  // only for coaches
  @OneToMany(() => MessageEntity, (message) => message.sender)
  messagesSent: MessageEntity[];
}
