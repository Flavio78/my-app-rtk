import { createSlice } from "@reduxjs/toolkit";

const postInitialState = {
  loading: false,
  hasErrors: false,
  post: {},
};

const postSlice = createSlice({
  name: "post",
  initialState: postInitialState,
  reducers: {
    requestPost: (state) => {
      state.loading = true;
    },
    getPostSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.post = payload;
    },
    getPostFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  requestPost,
  getPostSuccess,
  getPostFailure,
} = postSlice.actions;
export const postSelector = (state) => state.post;
export default postSlice.reducer;
export const fetchPost = (id) => {
  return async (dispatch) => {
    dispatch(requestPost());
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await response.json();
      dispatch(getPostSuccess(data));
    } catch (error) {
      dispatch(getPostFailure());
    }
  };
};
