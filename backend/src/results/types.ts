import { ResultEntity } from './result.entity';

export type Result = Omit<ResultEntity, 'id'>;

export type GetResultsQuery = {
  athleteId: number;
};

export type UpdateResultReq = {
  body: {
    id: number;
    score: string;
    rating: number;
  };
};
