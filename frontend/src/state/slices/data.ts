import { createSlice } from "@reduxjs/toolkit";
import { ActionType } from "./types";

export interface Coach {
  id: number;
  username: string;
  role: "Trener";
}

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

export interface Competition {
  id: string;
  description: string;
  date: string;
  time: string;
  results: ResultWithAthlete[];
}

type ResultWithCompetition = Result & {
  competition: Omit<Competition, "results">;
};

interface Message {
  id: number;
  content: string;
  createdAt: string;
  isRead: boolean;
  isReadByAll?: boolean;
}
export interface DataState {
  coaches: Coach[];
  clubs: Club[];
  athletes: Athlete[];
  competitions: Competition[];
  results: ResultWithCompetition[];
  messages: Message[];
  error: string | null;
}

interface DataPayload<T> {
  data: T;
  error?: string | null;
}

const initialState: DataState = {
  coaches: [],
  clubs: [],
  athletes: [],
  competitions: [],
  results: [],
  messages: [],
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
    getMessages: (state, action: ActionType<DataPayload<Message[]>>) => {
      state.messages = action.payload.data;
    },
    readMessage: (state, action: ActionType<DataPayload<Message["id"]>>) => {
      state.messages = state.messages.map((message) => {
        if (message.id === action.payload.data)
          return { ...message, isRead: true };
        return message;
      });
    },
  },
});

export const {
  getCoaches,
  getClubs,
  getAthletes,
  getCompetitions,
  getResults,
  getMessages,
  readMessage,
} = dataSlice.actions;

export default dataSlice.reducer;
