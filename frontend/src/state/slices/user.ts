import { createSlice } from "@reduxjs/toolkit";
import { ActionType } from "./types";

export type User = {
  id: number;
  username: string;
  role: "Trener" | "Sportowiec";
  accessToken: string;
  clubName: string;
  coach: string;
  avatar?: string;
};

export type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    signIn: (state, action: ActionType<UserState>) => {
      state.user = action.payload.user;
      state.loading = false;
      state.error = action.payload.error;
    },
    signOut: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    setAvatar: (state, action: ActionType<UserState>) => {
      state.user = action.payload.user;
      state.error = action.payload.error;
    },
  },
});

export const { signIn, signOut, setAvatar } = userSlice.actions;

export default userSlice.reducer;
