import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import counterReducer from "../slices/counterSlice";
import authReducer from "../slices/authSlice";
import usersReducers from "../slices/usersSlice";
import { postsReducer } from "../slices/postsSlice";
import { postReducer } from "../slices/postSlice";
import { commentsReducer } from "../slices/commentsSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    users: usersReducers,
    posts: postsReducer,
    post: postReducer,
    comments: commentsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
