// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";
import moment from "moment";

// Create a slice (simplifies reducers and actions)
const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    selectedDate: moment().toISOString(),
    selectedMonth: moment().toISOString(),
    selectedResource: "all",
  },
  reducers: {
    setSelectedDate: (state, payload) => {
      state.selectedDate = payload.payload;
    },
    setSelectedMonth: (state, payload) => {
      state.selectedMonth = payload.payload;
    },
    setSelectedResource: (state, payload) => {
      state.selectedResource = payload.payload;
    },
    reset: (state) => {
      state.selectedDate = moment();
      state.selectedMonth = moment();
      state.selectedResource = "all";
    },
  },
});

// Export actions
export const { setSelectedDate, setSelectedMonth, setSelectedResource, reset } =
  calendarSlice.actions;

// Create Redux store
const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
  },
});

export default store;
