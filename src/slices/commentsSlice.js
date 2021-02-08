import { createSlice } from "@reduxjs/toolkit";
import { requestPosts } from "./postsSlice";

const initialCommentsState = {
  loading: false,
  hasErrors: false,
  comments: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState: initialCommentsState,
  reducers: {
    requestComment: (state) => {
      state.loading = true;
      state.hasErrors = false;
    },
    getCommentsSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.comments = payload;
    },
    getCommentsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  requestComment,
  getCommentsFailure,
  getCommentsSuccess,
} = commentsSlice.actions;
export default commentsSlice.reducer;
export const commentsSelector = (state) => state.comments;

export const fetchComments = (postId) => {
  return async (dispatch) => {
    dispatch(requestPosts());
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      const data = await response.json();
      dispatch(getCommentsSuccess(data));
    } catch (error) {
      dispatch(getCommentsFailure());
    }
  };
};
