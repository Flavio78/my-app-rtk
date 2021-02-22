import {
  createSlice,
  createEntityAdapter,
  nanoid,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const SLICENAME = "todos";
const ENDPOINT = "http://localhost:3001/todos";

export const todoAdapter = createEntityAdapter({
  selectId: (todo) => todo.id,
});
export const todoSelectors = todoAdapter.getSelectors((state) => state.todos);

export const fetchTodos = createAsyncThunk(
  `${SLICENAME}/fetchTodos`,
  async () => {
    return fetch(ENDPOINT)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => json);
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: todoAdapter.getInitialState({
    deletedTodos: [],
    loading: false,
    hasError: false,
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
  extraReducers: {
    [fetchTodos.pending](state) {
      state.loading = true;
    },
    [fetchTodos.rejected](state, { error }) {
      state.loading = false;
      state.hasError = true;
    },
    [fetchTodos.fulfilled](state, { payload }) {
      state.loading = false;
      state.hasError = false;
      todoAdapter.setAll(state, payload);
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
