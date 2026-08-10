import {configureStore} from "@reduxjs/toolkit";
import {medicalApi} from "@/store/api";

export const store = configureStore({
  reducer: {
    [medicalApi.reducerPath]: medicalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(medicalApi.middleware),
})
