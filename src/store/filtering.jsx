import { createSlice } from "@reduxjs/toolkit";

const initialFilteringState = {
  order: "title",
  group: "status",
};

const filteringSlice = createSlice({
  name: "filtering",
  initialState: initialFilteringState,
  reducers: {
    changeOrder(state, action) {
      state.order = action.payload;
      localStorage.setItem("order", action.payload);
    },
    changeGroup(state, action) {
      state.group = action.payload;
      localStorage.setItem("group", action.payload);
    },
  },
});

export const filteringActions = filteringSlice.actions;

export default filteringSlice.reducer;
