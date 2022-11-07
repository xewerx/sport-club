import { createSlice } from "@reduxjs/toolkit";

export type User = {
  id: string;
  username: string;
  role: "coach" | "athlete";
  accessToken: string;
  avatar: string;
};

export type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload.user;
    },
    signOut: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
