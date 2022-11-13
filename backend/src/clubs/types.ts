import { ClubEntity } from './clubs.entity';

export type Club = ClubEntity;

export type GetClubsParams = {
  owner: string;
};
