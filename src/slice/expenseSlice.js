import { createSlice, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
export const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    currentId: 0,
    data: [
      {
        date: moment("2022-03-31"),
        name: "An Toi",
        amount: 100000,
        isUsefull: true,
        id: uuidv4(),
      },
    ],
    modalVisibile: false,
  },
  reducers: {
    addExpense: (state, action) => {

      
       state.data = [...state.data, { ...action.payload, id: uuidv4() }];
    },
    removeExpense: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    updateExpense: (state, action) => {
      state.data = state.data.map(
        (item) =>
          item.id === action.payload.id
            ? { ...action.payload.values, id: action.payload.id }
            : item

        // if (item.id == action.payload.id) {
        //   return { id: action.payload.id, ...action.payload.values };
        // } else {
        //   return item;
        // }
      );
    },
    toggleModalVisibel: (state, action) => {
      // console.log("action.payload: ", action.payload);
      state.modalVisibile = action.payload;
    },
  },
});
export const selectExpense = (state) => state.expense.data;
export const getExpense = (state, id) =>
  state.expense.data.find((item) => item.id === id);

export const { addExpense, removeExpense, updateExpense, toggleModalVisibel } =
  expenseSlice.actions;

export default expenseSlice.reducer;
