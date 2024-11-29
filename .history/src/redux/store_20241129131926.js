import { configureStore } from "@reduxjs/toolkit";
import shiftReducer from './features/shiftSlice' ;
import task  from './features/tasksSlice'

const store = configureStore({
  reducer: {
    shift: shiftReducer,
    tasks: tasksReducer,
    
  },
});

export default store;
