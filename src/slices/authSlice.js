import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  token: "",
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
    },
    loginFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFailed } = authSlice.actions;
export const selectToken = (state) => state.token;
export default authSlice.reducer;
