import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/FilterSlice";
import dateReducer from "./slices/DateSlice";
import plReducer from "./slices/plSlice";
import fmsReducer from "./slices/fmsSlice";

const store = configureStore({
  reducer: {
    filters: filterReducer,
    dates: dateReducer,
    plForVin: plReducer,
    fmsFils: fmsReducer,
  },
});

export default store;
