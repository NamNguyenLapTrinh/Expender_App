import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./slice/expenseSlice";
import incomeReducer from "./slice/incomeSlice";
 const store =  configureStore({
  reducer: {
    expense: expenseReducer,
    income: incomeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});



export default store;