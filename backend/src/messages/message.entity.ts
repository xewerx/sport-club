import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/users/users.entity';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  createdAt: string;

  @Column()
  isRead: boolean;

  @ManyToOne(() => UserEntity, (user) => user.id)
  sender: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  recipient: UserEntity;
}
