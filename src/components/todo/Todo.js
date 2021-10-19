import React, { useState } from "react";
import classes from "./Todo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { todosActions } from "../../store/todos-slice";

function Todo({ title, id }) {
  const dispatch = useDispatch();
  const [changeInput, setChangeInput] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  const [hidden, setHidden] = useState(false);
  const tasks = useSelector((state) => state.todos.allTodos);
  const taskFind = tasks.find((item) => item.id === id);

  const deleteHandler = () => {
    dispatch(todosActions.removeTodo({ id: id }));
  };
  const changeTaskHandler = (e) => {
    e.preventDefault();
    dispatch(
      todosActions.changeTask({ id: id, title: changeInput, property: "title" })
    );
    setIsChanging(false);
    setChangeInput("");
  };
  const buttonEditHandler = () => {
    setIsChanging((prevState) => !prevState);
  };
  const hideHandler = () => {
    setHidden((prevState) => !prevState);
  };
  const archiveHandler = () => {
    dispatch(
      todosActions.changeTask({ id: id, title: true, property: "archived" })
    );
  };
  if (hidden) {
    return (
      <div className={classes.todoCard}>
        <h1 className={classes.hiddenHeader}>Task hidden</h1>
        <button onClick={hideHandler} className={classes.hide}>
          Show
        </button>
      </div>
    );
  }
  return (
    <div
      id={id}
      className={
        taskFind.completed
          ? `${classes.todoCard} ${classes.todoCard__completed}`
          : classes.todoCard
      }
    >
      <button onClick={hideHandler} className={classes.hide}>
        Hide
      </button>
      <h2 className={classes.todoCard__title}>{title}</h2>
      {isChanging && (
        <form onSubmit={changeTaskHandler} className={classes.todoCard__form}>
          <input
            type="text"
            onChange={(e) => setChangeInput(e.target.value)}
            value={changeInput}
            className={classes.todoCard__input}
          />
          <button type="submit" className={classes.todoCard__changeBtn}>
            Change Task
          </button>
        </form>
      )}
      <div className={classes.todoCard__actions}>
        <button onClick={deleteHandler}>Delete</button>
        <button
          onClick={() => {
            // setIsCompleted((prevState) => {

            //   return !prevState;
            // });

            dispatch(
              todosActions.changeTask({
                id: id,
                title: taskFind.completed ? false : true,
                property: "completed",
              })
            );
          }}
        >
          {!taskFind.completed ? " Complete" : "Uncomplete"} Task
        </button>
        <button onClick={buttonEditHandler}>Edit Task</button>
        <button onClick={archiveHandler}>Archive</button>
      </div>
      {taskFind.completed && (
        <p className={classes.todoCard__compText}>Task Completed!</p>
      )}
    </div>
  );
}

export default Todo;
