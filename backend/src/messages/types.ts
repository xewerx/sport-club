import { AuthorizedUser } from 'src/auth/types';

export interface SendMessageReq extends AuthorizedUser {
  body: {
    content: string;
    to: string[];
  };
}

export interface ReadMessageReq extends AuthorizedUser {
  body: {
    id: number;
  };
}

export interface GetMessagesReq extends AuthorizedUser {
  body: {
    id: number;
  };
}
