import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export const todoAdapter = createEntityAdapter();
export const todoSelectors = todoAdapter.getSelectors((state) => state.todos);

const todoSlice = createSlice({
  name: "todos",
  initialState: todoAdapter.getInitialState({
    deletedTodos: [],
  }),
  reducers: {
    addTodo: todoAdapter.addOne,
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;