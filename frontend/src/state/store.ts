import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import dataReducer from "./slices/data";

const store = configureStore({
  reducer: {
    userState: userReducer,
    dataState: dataReducer,
  },
});

export default store;
