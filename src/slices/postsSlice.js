import { createSlice } from "@reduxjs/toolkit";

const postsInitialState = {
  loading: false,
  hasErrors: false,
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState: postsInitialState,
  reducers: {
    requestPosts: (state) => {
      state.loading = true;
    },
    getPostsSuccess: (state, { payload }) => {
      state.posts = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getPostsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(requestPosts());
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      dispatch(getPostsSuccess(data));
    } catch (error) {
      dispatch(getPostsFailure());
    }
  };
};

export const {
  requestPosts,
  getPostsSuccess,
  getPostsFailure,
} = postsSlice.actions;
export const postsSelector = (state) => state.posts;
export default postsSlice.reducer;
