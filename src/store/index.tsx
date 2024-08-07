import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { adApiSlice } from "@/api/adApiSlice";
import { authApiSlice } from "@/api/authApiSlice";
import user from "@/store/slices/userSlice.js";
import filter from "@/store/slices/filterSlice";

const store = configureStore({
  reducer: {
    user,
    filter,
    [adApiSlice.reducerPath]: adApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      adApiSlice.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
