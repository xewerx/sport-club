import { UserEntity } from 'src/users/user.entity';

export type LoginResponse = {
  accessToken: string;
  username: string;
  role: string;
};

export type User = UserEntity;
export type RegisterInput = Omit<UserEntity, 'id'>;
export type UserWithoutPassword = Omit<UserEntity, 'password'>;

export interface RegisterReq extends Express.Request {
  body: RegisterInput;
}

export interface LoginReq extends Express.Request {
  user: User;
}

export type ProfileReq = LoginReq;
