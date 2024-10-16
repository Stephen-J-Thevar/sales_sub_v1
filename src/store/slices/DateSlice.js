import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: {
    start_date: null,
    end_date: null,
  },
};

const DateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    addDates(state, action) {
      state.date = action.payload;
    },
  },
});

export const { addDates } = DateSlice.actions;
export default DateSlice.reducer;
