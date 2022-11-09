import { createSlice } from "@reduxjs/toolkit";
import { ActionType } from "./types";

export type Coach = {
  id: string;
  username: string;
  role: "Trener";
  accessToken: string;
  avatar: string;
};

export type DataState = {
  coaches: Coach[];
  error: string | null;
};

const initialState: DataState = {
  coaches: [],
  error: null,
};

const dataSlice = createSlice({
  name: "dataState",
  initialState,
  reducers: {
    getCoaches: (state, action: ActionType<DataState>) => {
      state.coaches = action.payload.coaches;
    },
  },
});

export const { getCoaches } = dataSlice.actions;

export default dataSlice.reducer;
