import { configureStore } from "@reduxjs/toolkit";
import filteringReducer from "./filtering";

const store = configureStore({
  reducer: { filtering: filteringReducer },
});

export default store;
