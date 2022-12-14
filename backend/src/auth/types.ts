import { UserEntity } from 'src/users/users.entity';

export type LoginResponse = {
  accessToken: string;
  username: string;
  id: number;
  role: string;
  clubName: string;
  coach: string;
  avatar: string;
};

export type User = UserEntity;
export type RegisterInput = Omit<UserEntity, 'id | club'> & {
  club: string;
};
export type UserWithoutPassword = Omit<UserEntity, 'password'>;

export interface RegisterReq extends Express.Request {
  body: RegisterInput;
}

export interface LoginReq extends Express.Request {
  user: User;
}

export type AuthorizedUser = LoginReq;
