import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { client } from "../api/client";
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

export const addTodo = createAsyncThunk(
  `${SLICENAME}/addTodo`,
  async (initialPost) => {
    console.log("initialPost", initialPost);
    const response = await client.post(`${ENDPOINT}`, {
      todo: initialPost,
    });
    console.log("response", response);
    return response;
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
  name: { SLICENAME },
  initialState: todoAdapter.getInitialState({
    deletedTodos: [],
    loading: false,
    hasError: false,
    status: "idle" | "loading" | "succeeded" | "failed",
    error: "string" | null,
  }),
  reducers: {},
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
      todoAdapter.removeOne(state, id);
    },
    [addTodo.pending](state) {
      state.loading = true;
      state.status = "loading";
    },
    [addTodo.rejected](state, { error }) {
      state.loading = false;
      state.hasError = true;
      state.status = "failed";
      state.error = error;
    },
    [addTodo.fulfilled]: todoAdapter.addOne,
  },
});

export default todoSlice.reducer;
