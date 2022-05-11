import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
export const incomeSlice = createSlice({
  name: "income",
  initialState: {
    currentId: 0,
    data: [
      {
        date: moment("2022-03-31"),
        name: "An Toi",
        amount: 100000,

        id: uuidv4(),
      },
    ],
  },
  reducers: {
    addIncome: (state, action) => {
      state.data = [...state.data, { ...action.payload, id: uuidv4() }];
    },
    removeIncome: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
  updateIncome: (state, action) => {
    state.data = state.data.map((item) =>
      item.id === action.payload.id
        ? { ...action.payload.values, id: action.payload.id }
        : item
    );
  },
});
export const selectIncome = (state) => state.income.data;

export const getIncome = (state, id) => (
   state.income.data.find((item) => item.id === id)
);
export const { addIncome, removeIncome, updateIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
