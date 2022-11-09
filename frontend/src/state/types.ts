import { DataState } from "./slices/data";
import { UserState } from "./slices/user";

export type AppState = {
  userState: UserState;
  dataState: DataState;
};
