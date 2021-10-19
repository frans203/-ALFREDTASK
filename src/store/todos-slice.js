import { createSlice } from "@reduxjs/toolkit";
const toPutFetch = (body) => {
  const response = fetch(
    "https://react-http-9bce5-default-rtdb.firebaseio.com/tasks.json",
    {
      method: "PUT",
      body: JSON.stringify(body),
    }
  )
    .then((data) => data)
    .then((data) => data.json());
};
const todosSlice = createSlice({
  name: "todos",
  initialState: { allTodos: [] },
  reducers: {
    addTodo(state, action) {
      state.allTodos = [...state.allTodos, action.payload];
    },
    removeTodo(state, action) {
      state.allTodos = state.allTodos.filter(
        (todo) => todo.id !== action.payload.id
      );

      toPutFetch(
        state.allTodos.filter((todo) => todo.id !== action.payload.id)
      );
    },
    deleteAllTasks(state) {
      state.allTodos = [];
      toPutFetch([]);
    },
    setAllTasks(state, action) {
      state.allTodos = action.payload;
    },
    changeTask(state, action) {
      const newArr = state.allTodos.filter(
        (todo) => todo.id !== action.payload.id
      );
      const getTask = state.allTodos.find(
        (todo) => action.payload.id === todo.id
      );
      getTask[action.payload.property] = action.payload.title;

      toPutFetch([getTask, ...newArr]);
    },
  },
});

export const todosActions = todosSlice.actions;
export default todosSlice;
