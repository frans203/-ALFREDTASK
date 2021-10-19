import React from "react";
import classes from "./ArchivedTodos.module.css";
import { useSelector } from "react-redux";
import ArcTodo from "./ArcTodo";
function ArchivedTodos() {
  const allTodos = useSelector((state) => state.todos.allTodos);
  return (
    <div className={classes.archivedTodos}>
      {allTodos.map((todo) => {
        if (todo.archived) {
          return <ArcTodo id={todo.id} key={todo.id} title={todo.title} />;
        }
      })}
    </div>
  );
}

export default ArchivedTodos;
