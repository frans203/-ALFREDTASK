import React from "react";
import { useSelector } from "react-redux";
import classes from "./AllTodos.module.css";
import Todo from "../todo/Todo";
function AllTodos() {
  const state = useSelector((state) => state.todos.allTodos);

  let content = "";

  content = state?.length === 0 && <h1>No tasks yet!</h1>;

  if (state?.length > 0) {
    content = state.map((todo) => {
      if (todo.archived) {
        return;
      }
      return <Todo key={todo.id} id={todo.id} title={todo.title} />;
    });
  }
  return <div className={classes.allTodos}>{content}</div>;
}

export default AllTodos;
