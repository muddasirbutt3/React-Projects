import React, { useContext } from "react";
import "./TodoList.css";
import { TasksContext } from "../context/TasksContext";

export const AllTask = () => {
  const { savedTasks, setSavedTasks, setEditTask } = useContext(TasksContext);

  const handleCheck = (e) => {
    let id = e.target.parentElement.getAttribute("taskid");
    setSavedTasks((prev) => {
      return prev.map((task) =>
        task.id == id ? { ...task, completed: !task.completed } : task
      );
    });
  };
  function handleEdit(id) {
    let editedTask = savedTasks.find((task) => task.id == id);
    setSavedTasks(savedTasks.filter((task) => task.id != id));
    setEditTask((prev) => (prev = editedTask.task));
  }
  function handleDel(id) {
    setSavedTasks(savedTasks.filter((task) => task.id != id));
  }
  if (savedTasks.length === 0) {
    return <p className="no-task">No tasks created.</p>;
  }
  return (
    <div className="Alltask-comp">
      {savedTasks.map((task) => (
        <div className="todo-item" key={task.id} taskid={task.id}>
          {task.completed || (
            <input
              type="checkbox"
              id="input"
              onChange={handleCheck}
              checked={task.completed}
              taskid={task.id}
            />
          )}
          <p className={task.completed ? "complete" : ""}>{task.task}</p>
          <div className="bth-group">
            {!task.completed ? (
              <button
                onClick={() => {
                  handleEdit(task.id);
                }}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            ) : (
              ""
            )}
            <button
              onClick={() => {
                handleDel(task.id);
              }}
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
