import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fmsState: {
    filterdata: {
      date_filter: {
        start_date: null,
        end_date: null,
      },
      month_filter: [],
      region_filter: [],
      state_filter: [],
      productline_filter: [],
      lob_filter: [],
      ppl_filter: [],
      pl_filter: [],
      vin_filter: [],
      mc_filter: [],
    },
  },
};

const fmsSlice = createSlice({
  name: "fmsFilter",
  initialState,
  reducers: {
    fmsFil(state, action) {
      state.fmsState = action.payload;
    },
    resetFms(state) {
      state.fmsState = initialState.fmsState;
    },
  },
});

export const { fmsFil, resetFms } = fmsSlice.actions;

export default fmsSlice.reducer;
