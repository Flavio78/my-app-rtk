import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const postInitialState = {
  loading: false,
  hasErrors: false,
  post: {},
};

export const getPost = createAsyncThunk("post/getPost", (id) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((json) => json);
});

const postSlice = createSlice({
  name: "post",
  initialState: postInitialState,
  reducers: {},
  extraReducers: {
    [getPost.pending]: (state) => {
      state.loading = true;
    },
    [getPost.rejected]: (state) => {
      state.hasErrors = true;
      state.loading = false;
    },
    [getPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.post = payload;
    },
  },
});

export const postSelector = (state) => state.post;
export const postReducer = postSlice.reducer;
