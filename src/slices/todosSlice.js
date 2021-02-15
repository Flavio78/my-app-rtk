import { createSlice, createEntityAdapter, nanoid } from "@reduxjs/toolkit";

export const todoAdapter = createEntityAdapter();
export const todoSelectors = todoAdapter.getSelectors((state) => state.todos);

const todoSlice = createSlice({
  name: "todos",
  initialState: todoAdapter.getInitialState({
    deletedTodos: [],
  }),
  reducers: {
    addTodo: (state, action) => {
      const todoItem = {
        id: nanoid(),
        todo: action.payload,
        completed: false,
      };
      todoAdapter.addOne(state, todoItem);
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
