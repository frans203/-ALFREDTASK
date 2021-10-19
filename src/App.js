import { useState, useEffect } from "react";
import classes from "./App.module.css";
import AllTodos from "./components/allTodos/AllTodos";
import { useDispatch, useSelector } from "react-redux";
import { todosActions } from "./store/todos-slice";
import ArchivedTodos from "./components/archivedTodos/ArchivedTodos";

function App() {
  const dispatch = useDispatch();
  const [currentValue, setCurrentValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showHideTasks, setShowHideTasks] = useState(false);
  const allTasks = useSelector((state) => state.todos.allTodos);
  useEffect(async () => {
    const fetchTasks = await fetch(
      "https://react-http-9bce5-default-rtdb.firebaseio.com/tasks.json"
    );
    const data = await fetchTasks.json();

    const newArr = [];
    for (const key in data) {
      newArr.push({
        title: data[key].title,
        id: key,
        archived: data[key].archived,
        completed: data[key].completed,
      });
    }

    dispatch(todosActions.setAllTasks(newArr));
  }, [todosActions]);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(
      todosActions.addTodo({
        title: currentValue,
        id: Math.random(),
        completed: false,
        archived: false,
      })
    );
    const response = await fetch(
      "https://react-http-9bce5-default-rtdb.firebaseio.com/tasks.json",
      {
        method: "POST",
        body: JSON.stringify({
          title: currentValue,
          id: Math.random(),
          completed: false,
          archived: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setCurrentValue("");
  };
  const deleteAllTaskHandler = () => {
    dispatch(todosActions.deleteAllTasks());
  };
  const searchTaskHandler = (e) => {
    e.preventDefault();
    const filteredTasks = allTasks.filter((tas) => {
      return tas.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    dispatch(todosActions.setAllTasks(filteredTasks));
    setSearchValue("");
  };
  const showAllTasks = async () => {
    const response = await fetch(
      "https://react-http-9bce5-default-rtdb.firebaseio.com/tasks.json"
    );
    const data = await response.json();
    const newArr = [];
    for (const key in data) {
      newArr.push({
        title: data[key].title,
        id: key,
        archived: data[key].archived,
        completed: data[key].completed,
      });
    }

    dispatch(todosActions.setAllTasks(newArr));
  };
  return (
    <div className={classes.app}>
      <h1>Todo Task Manager</h1>
      {showHideTasks && <ArchivedTodos />}
      <form onSubmit={submitHandler} className={classes.inputForm}>
        <input
          type="text"
          value={currentValue}
          placeholder="Add a new Task..."
          onChange={(e) => setCurrentValue(e.target.value)}
        />
        <button type="submit" className={classes.formBtn}>
          Add Task
        </button>
      </form>
      <form
        className={`${classes.inputForm} ${classes.inputFormSecond}`}
        onClick={searchTaskHandler}
      >
        <input
          type="text"
          value={searchValue}
          placeholder="Search Tasks..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" className={classes.formBtn}>
          Search
        </button>
        <button
          type="button"
          onClick={showAllTasks}
          className={`${classes.formBtn} ${classes.formBtnShowAll}`}
        >
          Show All Tasks
        </button>
      </form>
      <AllTodos />
      <button className={classes.deleteButton} onClick={deleteAllTaskHandler}>
        Delete all Tasks
      </button>
      <button
        className={classes.archiveButton}
        onClick={() => {
          setShowHideTasks((prevState) => !prevState);
        }}
      >
        Archived Tasks
      </button>
    </div>
  );
}

export default App;
