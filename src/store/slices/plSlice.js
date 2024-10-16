import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  mod: 0,
};

const plSlice = createSlice({
  name: "plForVin",
  initialState,
  reducers: {
    addPL(state, action) {
      state.data = action.payload.data;
      state.mod = action.payload.mod;
    },
    resetPl(state) {
      state.data = initialState.data;
      state.mod = initialState.mod;
    },
  },
});

export const { addPL, resetPl } = plSlice.actions;

export default plSlice.reducer;
