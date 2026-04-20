import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnections: (state, action) => {
      const merged = [...state, ...action.payload];
      const uniqueById = new Map();
      merged.forEach((user) => {
        uniqueById.set(user._id, user);
      });
      return Array.from(uniqueById.values());
    },
    removeConnections: (state, action) => {
      return [];
    },
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
