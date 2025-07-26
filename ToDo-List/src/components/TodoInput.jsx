import React, { useContext, useEffect, useRef, useState } from "react";
import "./TodoInput.css";
import { TasksContext } from "../context/TasksContext";

export const TodoInput = () => {
  let input = useRef();
  let { savedTasks, setSavedTasks, editTask, setEditTask } =
    useContext(TasksContext);
  let [value, setValue] = useState("");

  useEffect(() => {
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
  }, [savedTasks]);

  useEffect(() => {
    if (!editTask) return;
    setValue((prev) => (prev = editTask));
    setEditTask("");
  }, [editTask]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  function handleAdd() {
    let currTask = value.trim();
    if (!currTask) return;
    setSavedTasks((prev) => [
      ...prev,
      { id: Date.now(), task: currTask, completed: false },
    ]);
    setValue("");
  }
  function handleDelAll() {
    if (savedTasks.length == 0) return;
    setSavedTasks((prev) => (prev = []));
    setValue("");
  }
  return (
    <div className="input-comp">
      <input
        type="text"
        ref={input}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key == "Enter") handleAdd();
        }}
        value={value}
        className="input"
        placeholder="Add new task"
      />
      <div className="btn-group">
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleDelAll}>Delete All</button>
      </div>
    </div>
  );
};
