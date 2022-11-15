export interface Result {
  athleteId: number;
  score: string;
  rating: number;
}

export interface Competition {
  description: string;
  date: string;
  time: string;
  results: Result[];
}

export interface SetCompetitionReq extends Express.Request {
  body: {
    competition: Competition;
  };
}
