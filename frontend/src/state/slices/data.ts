import { createSlice } from "@reduxjs/toolkit";
import { ActionType } from "./types";

export type Coach = {
  id: number;
  username: string;
  role: "Trener";
};

export type Athlete = Coach;

type Club = {
  id: number;
  name: string;
};

export interface Result {
  athleteId: number;
  score: string;
  rating: number;
}

type ResultWithAthlete = Result & {
  athlete: Omit<Athlete, "role">;
  id: number;
};

export type Competition = {
  id: string;
  description: string;
  date: string;
  time: string;
  results: ResultWithAthlete[];
};

type ResultWithCompetition = Result & {
  competition: Omit<Competition, "results">;
};

export type DataState = {
  coaches: Coach[];
  clubs: Club[];
  athletes: Athlete[];
  competitions: Competition[];
  results: ResultWithCompetition[];
  error: string | null;
};

type DataPayload<T> = {
  data: T;
  error?: string | null;
};

const initialState: DataState = {
  coaches: [],
  clubs: [],
  athletes: [],
  competitions: [],
  results: [],
  error: null,
};

const dataSlice = createSlice({
  name: "dataState",
  initialState,
  reducers: {
    getCoaches: (state, action: ActionType<DataPayload<Coach[]>>) => {
      state.coaches = action.payload.data;
    },
    getClubs: (state, action: ActionType<DataPayload<Club[]>>) => {
      state.clubs = action.payload.data;
    },
    getAthletes: (state, action: ActionType<DataPayload<Athlete[]>>) => {
      state.athletes = action.payload.data;
    },
    getCompetitions: (
      state,
      action: ActionType<DataPayload<Competition[]>>
    ) => {
      state.competitions = action.payload.data;
    },
    getResults: (
      state,
      action: ActionType<DataPayload<ResultWithCompetition[]>>
    ) => {
      state.results = action.payload.data;
    },
  },
});

export const {
  getCoaches,
  getClubs,
  getAthletes,
  getCompetitions,
  getResults,
} = dataSlice.actions;

export default dataSlice.reducer;
