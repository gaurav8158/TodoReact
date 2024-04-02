import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//create action
export const createTodo = createAsyncThunk(
  "createTodo",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://6501504b736d26322f5b7c15.mockapi.io/todo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();

      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//read action
export const showTodo = createAsyncThunk(
  "showTodo",
  async (args, { rejectWithValue }) => {
    const response = await axios.get(
      "https://6501504b736d26322f5b7c15.mockapi.io/todo"
    );
    try {
      const data = await response.data;
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

//delete action
export const deleteTodo = createAsyncThunk(
  "deleteTodo",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://6501504b736d26322f5b7c15.mockapi.io/todo/${id}`,
      { method: "DELETE" }
    );
    try {
      const result = await response.json();
      // return {id};
      console.log(result);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `https://6501504b736d26322f5b7c15.mockapi.io/todo/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const todoDetail = createSlice({
  name: "todoDetail",
  initialState: {
    todo: [],
    loading: false,
    error: null,
    searchTodo: [],
  },
  reducers: {
    searchTodo: (state, action) => {
      //  console.log(action.payload);
      state.searchTodo = action.payload;
    },
  },
  extraReducers: {
    [createTodo.pending]: (state) => {
      state.loading = true;
    },
    [createTodo.fulfilled]: (state, action) => {
      state.loading = false;
      state?.todo?.push(action.payload);
    },
    [createTodo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },

    [showTodo.pending]: (state) => {
      state.loading = true;
    },
    [showTodo.fulfilled]: (state, action) => {
      state.loading = false;
      state.todo = action.payload;
      console.log(state.todo);
    },
    [showTodo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },

    [deleteTodo.pending]: (state) => {
      state.loading = true;
    },
    [deleteTodo.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload);

      const { id } = action.payload;
      console.log(state.todo);
      if (id) {
        state.todo = state.todo.filter((ele) => ele.id !== id);
      }
    },
    [deleteTodo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },

    [updateTodo.pending]: (state) => {
      state.loading = true;
    },
    [updateTodo.fulfilled]: (state, action) => {
      state.loading = false;
      state.todo = state.todo.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
    [updateTodo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
export default todoDetail.reducer;
export const { searchTodo } = todoDetail.actions;
