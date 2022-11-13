import { UserEntity } from './users.entity';

export type UserInput = Omit<UserEntity, 'id'>;
export type Coach = Omit<UserEntity, 'password'>;

export type CoachesReq = Express.Request;

export interface SetClubReq extends Express.Request {
  body: {
    clubId: number;
    userId: number;
  };
}

export interface SetAvatarReq extends Express.Request {
  body: {
    userId: number;
    avatar: string;
  };
}
