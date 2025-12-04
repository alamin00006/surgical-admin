import { configureStore } from "@reduxjs/toolkit";

import profileMenuSlice from "./reducers/profileMenuSlice";
import paginationSlice from "./reducers/paginationSlice";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    profileMenu: profileMenuSlice,
    pagination: paginationSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  // devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
