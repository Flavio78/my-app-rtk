import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import counterReducer from "../slices/counterSlice";
import authReducer from "../slices/authSlice";
import usersReducers from "../slices/usersSlice";
import postsReducers from "../slices/postsSlice";
import postReducers from "../slices/postSlice";
import commentsReducers from "../slices/commentsSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    users: usersReducers,
    posts: postsReducers,
    post: postReducers,
    comments: commentsReducers,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
