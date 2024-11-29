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
      handoverNotes: "",       // New handover notes field
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
      handoverNotes: "Ensure to monitor the motor vibrations after repair.", // Example handover notes
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
    // Toggle task status between Pending and Completed
    toggleTaskStatus: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = task.status === "Pending" ? "Completed" : "Pending";
      }
    },
    // Set the shift filter (Morning, Afternoon, Night, or All)
    setShiftFilter: (state, action) => {
      state.filters.shift = action.payload;
    },
    // Set the sort order (Priority or Status)
    setSortOrder: (state, action) => {
      state.filters.sort = action.payload;
    },
    // Add a new task to the tasks array
    addTask: (state, action) => {
      state.tasks.push({ ...action.payload, id: Date.now() });  // Add handoverNotes field in the payload if provided
    },
    // Update an existing task, allowing modification of the handover notes as well
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        Object.assign(task, updates);  // Apply updates including handoverNotes
      }
    },
  },
});

export const { toggleTaskStatus, setShiftFilter, setSortOrder, addTask, updateTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
