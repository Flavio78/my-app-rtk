import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialCommentsState = {
  loading: false,
  hasErrors: false,
  comments: [],
};

export const getComments = createAsyncThunk(
  "comments/getComments",
  (postId) => {
    return fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    )
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => json);
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: initialCommentsState,
  reducers: {},
  extraReducers: {
    [getComments.pending]: (state) => {
      state.loading = true;
    },
    [getComments.rejected]: (state, { error }) => {
      state.loading = false;
      state.hasErrors = true;
    },
    [getComments.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.comments = payload;
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
export const commentsSelector = (state) => state.comments;
