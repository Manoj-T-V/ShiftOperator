import { configureStore } from "@reduxjs/toolkit";
import shiftReducer from './features/shiftSlice' ;
import tasksSlice  from './features/tasksSlice'

const store = configureStore({
  reducer: {
    shift: shiftReducer,
    tasks: tasksSlice,
    
  },
});

export default store;