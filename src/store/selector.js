import { createSelector } from "reselect";

function selectFilters(state) {
  return state.filters;
}

function selectDates(state) {
  return state.dates.date;
}

export const selectFilterData = createSelector(
  [selectFilters],
  (filters) => filters.data
);

export const selectStartDate = createSelector(
  [selectDates],
  (dates) => dates.start_date
);

export const selectEndDate = createSelector(
  [selectDates],
  (dates) => dates.end_date
);
