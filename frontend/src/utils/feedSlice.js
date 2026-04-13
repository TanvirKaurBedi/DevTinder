import { createSlice } from "@reduxjs/toolkit";
const feedSlice = createSlice({
  name: "feed",
  initialState: {
    posts: [],
  },
  reducers: {
    setFeedPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});
export const { setFeedPosts } = feedSlice.actions;
export default feedSlice.reducer;
