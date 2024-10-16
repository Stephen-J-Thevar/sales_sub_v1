import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    filterdata: {
      date_filter: {
        start_date: null,
        // start_date: "2023-11-01",
        end_date: null,
        // end_date: "2023-11-02",
      },
      region_filter: [],
      state_filter: [],
      lob_filter: [],
      dealer_name_filter: [],
      veh_type: [],
    },
  },
  submitted: 0,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addFilters(state, action) {
      console.log(state);
      console.log(action.payload);
      state.data.filterdata = action.payload.data;
      state.submitted = action.payload.submitted;
    },
    applyFilters(state, action) {
      state.data.filterdata = action.payload;
    },
    chgSubmitted(state, action) {
      state.submitted = action.payload;
    },
    chgFmsNav(state, action) {
      state.fmsNav = action.payload;
    },
    updateFil(state, action) {
      const { key, arr } = action.payload;
      state.data.filterdata[key] = arr;
    },
    resetFilters(state) {
      state.data = initialState.data;
      state.submitted = initialState.submitted;
    },
  },
});

export const {
  addFilters,
  applyFilters,
  chgSubmitted,
  chgFmsNav,
  resetFilters,
  updateFil,
} = filterSlice.actions;

export default filterSlice.reducer;
