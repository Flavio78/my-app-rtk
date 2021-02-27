import {
  createSlice,
  createEntityAdapter,
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

// client.post = function (endpoint, body, customConfig = {}) {
//   const headers = { 'Content-Type': 'application/json' }

//   const config = {
//     method: 'POST',
//     ...customConfig,
//     headers: {
//       ...headers,
//       ...customConfig.headers,
//     },
//   }

//   if (body) {
//     config.body = JSON.stringify(body)
//   }

//   let data
//   try {
//     const response = await window.fetch(endpoint, config)
//     data = await response.json()
//     if (response.ok) {
//       return data
//     }
//     throw new Error(response.statusText)
//   } catch (err) {
//     return Promise.reject(err.message ? err.message : data)
//   }
// }
// }

export const addTodo = createAsyncThunk(
  `${SLICENAME}/addTodo`,
  async (todo) => {
    console.log("JSON.stringify(todo)", JSON.stringify(todo));
    await fetch(`${ENDPOINT}`, {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    }).then((response) => {
      if (!response.ok) {
        console.log("response.statusText", response.statusText);
        throw Error(response.statusText);
      }
      console.log("response.json()", response.json());
      return response.json();
    });
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
    [addTodo.fulfilled]: todoAdapter.upsertOne,
  },
});

export default todoSlice.reducer;
