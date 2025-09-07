// name, initialState, reducers

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  const apiResponse = await fetch("https://dummyjson.com/todos");
  const result = await apiResponse.json();

  return result;
});

const initialState = {
  todoList: [],
  loading : false,
  todoListFromApi : [],
  isError : false
};

const todoReducer = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    //combine all the actions that you need

    addTodo(state, action) {
      console.log("addTodo", action);
      const newlyCreatedTodo = {
        id: state.todoList.length === 0 ? 1 : state.todoList.length + 1,
        title: action.payload,
      };

      state.todoList.push(newlyCreatedTodo);

      return state;
    },
    deleteTodo(state, action) {
      console.log("deleteTodo", action);
      state.todoList = state.todoList.filter(
        (todoItem) => todoItem.id !== action.payload
      );

      return state;
    },
    editTodo(state, action) {
      console.log("editTodo", action);
      let getTodos = state.todoList;

      const getCurrentTodoIndex = getTodos.findIndex(
        (item) => item.id === action.payload.currentEditedTodoID
      );

      getTodos[getCurrentTodoIndex] = {
        ...getTodos[getCurrentTodoIndex],
        title: action.payload.currentTodo,
      };
      state.todoList = getTodos;

      return state;
    },

    fetchTodosApiSagaStart: (state, action) => {
      state.loading = true;
    },
    fetchTodosApiSagaSuccess: (state, action) => {
      state.loading = false;
      state.todoListFromApi = action.payload.todos
    },
    fetchTodosApiSagaFailure: (state, action) => {
      state.loading = false;
      state.isError = true;
    }
  },
  extraReducers : (builder)=> {
     builder.addCase(fetchTodos.pending, (state, action)=> {
        state.loading = true;
     })

     builder.addCase(fetchTodos.fulfilled, (state,action)=> {
      console.log("extraReducers-state", state);
      console.log("extraReducers-action", action);
      
        state.loading = false;
        state.todoListFromApi = action.payload.todos;
     })

     builder.addCase(fetchTodos.rejected, (state,action)=>{
        state.loading = false;
        state.isError = true
     })
  }
});

export const { addTodo, deleteTodo, editTodo, fetchTodosApiSagaStart, fetchTodosApiSagaSuccess, fetchTodosApiSagaFailure } = todoReducer.actions;

export default todoReducer.reducer;
