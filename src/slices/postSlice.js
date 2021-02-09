import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const SLICENAME = "post";
const ENDPOINT = "https://jsonplaceholder.typicode.com/posts/";

const initialState = {
  loading: false,
  hasErrors: false,
  post: {},
};

export const getPost = createAsyncThunk(`${SLICENAME}/getPost`, (id) => {
  return fetch(`${ENDPOINT}${id}`)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((json) => json);
});

const postSlice = createSlice({
  name: SLICENAME,
  initialState,
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
