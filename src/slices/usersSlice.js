import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const usersInitialState = {
  loading: false,
  error: "",
  data: [],
};

export const getUsers = createAsyncThunk("users/getUsers", (arg) => {
  return fetch(arg)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((json) => json);
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {},

  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export const { loginSuccess, loginFailed } = usersSlice.actions;
export const selectData = (state) => state.data;
export default usersSlice.reducer;
