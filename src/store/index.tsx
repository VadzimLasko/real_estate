import { configureStore } from "@reduxjs/toolkit";
import { adApiSlice } from "@/api/adApiSlice";
import { authApiSlice } from "@/api/authApiSlice";
import user from "@/pages/userProfilePage/userProfileSlice.js";

const store = configureStore({
  reducer: {
    user,
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

export default store;
