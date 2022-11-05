import { UserEntity } from './user.entity';

export type UserInput = Omit<UserEntity, 'id'>;
