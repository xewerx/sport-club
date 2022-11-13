import { createSlice } from "@reduxjs/toolkit";
import { ActionType } from "./types";

export type Coach = {
  id: string;
  username: string;
  role: "Trener";
  accessToken: string;
  avatar: string;
};

type Club = {
  id: number;
  name: string;
};

export type DataState = {
  coaches: Coach[];
  clubs: Club[];
  error: string | null;
};

const initialState: DataState = {
  coaches: [],
  clubs: [],
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
      console.log(action.payload.clubs);
      state.clubs = action.payload.clubs;
    },
  },
});

export const { getCoaches, getClubs } = dataSlice.actions;

export default dataSlice.reducer;
