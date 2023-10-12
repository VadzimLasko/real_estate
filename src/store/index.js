import { configureStore } from "@reduxjs/toolkit";

// import clients from '../components/formCard/formSlice';
// import modalReducer from '../features/modal/modalSlice'
// import calculatorReducer from '../features/calculator/calculatorSlice';

const stringMiddleware = (store) => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
