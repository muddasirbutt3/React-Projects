import React, { useContext } from "react";
import { TasksContext } from "../context/TasksContext";
import "./TodoList.css";

export const PendingTask = () => {
  const { savedTasks, setSavedTasks, setEditTask } = useContext(TasksContext);

  function handleEdit(id) {
    let editedTask = savedTasks.find((task) => task.id == id);
    setSavedTasks(savedTasks.filter((task) => task.id != id));
    setEditTask((prev) => (prev = editedTask.task));
  }
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
  return (
    <div className="Alltask-comp">
      {savedTasks.filter((task) => !task.completed).length == 0 ? (
        <p className="no-task">No pending tasks.</p>
      ) : (
        savedTasks
          .filter((task) => !task.completed)
          .map((task) => (
            <div className={`todo-item `} key={task.id} taskid={task.id}>
              <input
                type="checkbox"
                id="input"
                onChange={handleCheck}
                checked={task.completed}
                taskid={task.id}
              />
              <p>{task.task}</p>
              <div className="bth-group">
                <button onClick={() => { handleEdit(task.id)}}><i className="fa-solid fa-pen-to-square"></i></button>
                <button onClick={() => { handleDel(task.id)}}><i className="fa-solid fa-trash-can"></i></button>
              </div>
            </div>
          ))
      )}
    </div>
  );
};
