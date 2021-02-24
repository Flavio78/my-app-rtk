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

export const addNewTodo = createAsyncThunk(
  `${SLICENAME}/addTodo`,
  async (newTodo) => {
    await fetch(`${ENDPOINT}`, {
      method: "POST",
      body: JSON.stringify(newTodo),
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return newTodo;
      })
      .then((newTodo) => newTodo);
  }
);

export const deleteTodo = createAsyncThunk(
  `${SLICENAME}/deleteTodo`,
  async (id) => {
    await fetch(`${ENDPOINT}/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) throw Error(response.statusText);
    });
    return id;
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: todoAdapter.getInitialState({
    deletedTodos: [],
    loading: false,
    hasError: false,
    status: "idle" | "loading" | "succeeded" | "failed",
    error: "string" | null,
  }),
  reducers: {
    addTodo: (state, action) => {
      const todoItem = {
        id: nanoid(),
        todo: action.payload,
        completed: false,
      };
      todoAdapter.addOne(state, todoItem);
      addNewTodo(todoItem);
    },
  },
  extraReducers: {
    [fetchTodos.pending](state) {
      state.loading = true;
      state.status = "loading";
    },
    [fetchTodos.rejected](state, { error }) {
      state.loading = false;
      state.hasError = true;
      state.status = "failed";
      state.error = error;
    },
    [fetchTodos.fulfilled](state, { payload }) {
      state.loading = false;
      state.hasError = false;
      todoAdapter.setAll(state, payload);
    },
    [deleteTodo.pending]: (state) => {
      state.loading = true;
    },
    [deleteTodo.fulfilled]: (state, { payload: id }) => {
      state.loading = false;
      state.hasError = false;
      console.log("id", id);
      todoAdapter.removeOne(state, id);
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
