import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "./features/data/dataSlice";
import { authReducer } from "./features/auth/authSlice";

const rootReducer = combineReducers({ data: dataReducer, auth: authReducer });

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

export const store = makeStore();