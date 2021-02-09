import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const SLICENAME = "posts";
const ENDPOINT = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  loading: false,
  hasErrors: false,
  posts: [],
};

export const getPosts = createAsyncThunk(`${SLICENAME}/getPosts`, () => {
  return fetch(ENDPOINT)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((json) => json);
});

const postsSlice = createSlice({
  name: SLICENAME,
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPosts.rejected]: (state, { error }) => {
      state.hasErrors = true;
      state.loading = false;
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
    },
  },
});

export const postsSelector = (state) => state.posts;
export const postsReducer = postsSlice.reducer;
