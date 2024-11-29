import { configureStore } from "@reduxjs/toolkit";
import shiftReducer from './features/shiftSlice' ;

const store = configureStore({
  reducer: {
    shift: shiftReducer,
  },
});

export default store;
