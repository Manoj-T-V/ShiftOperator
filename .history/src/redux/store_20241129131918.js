import { configureStore } from "@reduxjs/toolkit";
import shiftReducer from './features/shiftSlice' ;
import task  from 

const store = configureStore({
  reducer: {
    shift: shiftReducer,
    tasks: tasksReducer,
    
  },
});

export default store;
