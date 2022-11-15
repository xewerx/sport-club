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

export type DataState = {
  coaches: Coach[];
  clubs: Club[];
  athletes: Athlete[];
  error: string | null;
};

const initialState: DataState = {
  coaches: [],
  clubs: [],
  athletes: [],
  error: null,
};

const dataSlice = createSlice({
  name: "dataState",
  initialState,
  reducers: {
    getCoaches: (state, action: ActionType<DataState>) => {
      state.coaches = action.payload.coaches;
    },
    getClubs: (state, action: ActionType<DataState>) => {
      state.clubs = action.payload.clubs;
    },
    getAthletes: (state, action: ActionType<DataState>) => {
      state.athletes = action.payload.athletes;
    },
  },
});

export const { getCoaches, getClubs, getAthletes } = dataSlice.actions;

export default dataSlice.reducer;
