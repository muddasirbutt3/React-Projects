import React, { useContext } from "react";
import { TasksContext } from "../context/TasksContext";
import "./TodoList.css";

export const CompletedTask = () => {
  const { savedTasks, setSavedTasks } = useContext(TasksContext);

  function handleDel(id) {
    setSavedTasks(savedTasks.filter((task) => task.id != id));
  }

  const handleCheck = (e) => {
    let id = e.target.parentElement.getAttribute("taskid");
    setSavedTasks((prev) => {
      return prev.map((task) =>
        task.id == id ? { ...task, completed: !task.completed } : task
      );
    });
  };
  if (savedTasks.filter((task) => task.completed) == 0) {
    return <p className="no-task">No comleted tasks.</p>;
  }
  return (
    <div className="Alltask-comp">
      {savedTasks
        .filter((task) => task.completed)
        .map((task) => (
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
            <p className="complete">{task.task}</p>
            <div className="bth-group">
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
