import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: 1,
      title: "Check motor vibration",
      details: "Recurring vibration in motor needs troubleshooting",
      source: "Adhoc Maintenance",
      shift: "Morning",
      status: "Pending",
      priority: "High",
      supervisorFeedback: "",  // Supervisor feedback field
      comments: "",            // Additional comments field
    },
    {
      id: 2,
      title: "Inspect conveyor belt",
      details: "Routine checkup of conveyor system",
      source: "SAP",
      shift: "Afternoon",
      status: "Completed",
      priority: "Medium",
      supervisorFeedback: "Repaired the motor.", // Example feedback
      comments: "Issue resolved during shift.",
    },
  ],
  filters: {
    shift: "All",   // 'All', 'Morning', 'Afternoon', 'Night'
    sort: "Priority", // 'Priority', 'Status'
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleTaskStatus: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = task.status === "Pending" ? "Completed" : "Pending";
      }
    },
    setShiftFilter: (state, action) => {
      state.filters.shift = action.payload;
    },
    setSortOrder: (state, action) => {
      state.filters.sort = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
  },
});

export const { toggleTaskStatus, setShiftFilter, setSortOrder, addTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
