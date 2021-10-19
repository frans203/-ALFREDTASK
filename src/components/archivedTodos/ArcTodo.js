import React from "react";
import classes from "./ArcTodo.module.css";
import { useDispatch } from "react-redux";
import { todosActions } from "../../store/todos-slice";

function ArcTodo({ title, id }) {
  const dispatch = useDispatch();
  const unarchiveHandler = () => {
    dispatch(
      todosActions.changeTask({ id: id, title: false, property: "archived" })
    );
  };
  return (
    <div className={classes.arcTodo}>
      <h2 className={classes.todoCard__title}>{title}</h2>
      <button className={classes.arcTodo__btn} onClick={unarchiveHandler}>
        Unarchive
      </button>
    </div>
  );
}

export default ArcTodo;
