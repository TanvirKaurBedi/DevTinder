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
    removeFeedPosts: (state, action) => {
      // state.posts = action.payload;
      const newFeed = state.posts.filter((post) => post._id !== action.payload);
      state.posts = newFeed;
    },
  },
});
export const { setFeedPosts, removeFeedPosts } = feedSlice.actions;
export default feedSlice.reducer;
