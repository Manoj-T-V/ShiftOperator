import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shifts: [
    { id: 1, name: "Morning", start: "08:00", end: "16:00", format: "24-hour", location: "", workforce: [] },
    { id: 2, name: "Afternoon", start: "16:00", end: "00:00", format: "24-hour", location: "", workforce: [] },
    { id: 3, name: "Night", start: "00:00", end: "08:00", format: "24-hour", location: "", workforce: [] },
  ],
  timeFormat: "24-hour",
};

const shiftSlice = createSlice({
  name: "shift",
  initialState,
  reducers: {
    addShift: (state, action) => {
      state.shifts.push({ ...action.payload, id: Date.now() });
    },
    updateShift: (state, action) => {
      const { id, updates } = action.payload;
      const shift = state.shifts.find((shift) => shift.id === id);
      if (shift) {
        Object.assign(shift, updates);
      }
    },
    resetShifts: (state) => {
      state.shifts = [];
    },
    toggleTimeFormat: (state) => {
      state.timeFormat = state.timeFormat === "24-hour" ? "12-hour" : "24-hour";
    },
  },
});

export const { addShift, updateShift, resetShifts, toggleTimeFormat } = shiftSlice.actions;

export default shiftSlice.reducer;
