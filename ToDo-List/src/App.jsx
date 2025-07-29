import { useEffect, useState } from "react";
import "./App.css";
import { TodoInput } from "./components/TodoInput";
import { AllTask } from "./components/AllTask";
import { TasksContext } from "./context/TasksContext";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { PendingTask } from "./components/PendingTask";
import { CompletedTask } from "./components/CompletedTask";

function App() {
  const location = useLocation();
  let [totalNum, setTotalNum] = useState(0);
  useEffect(() => {
    if (location.pathname == "/") {
      setTotalNum(savedTasks.length);
    } else if (location.pathname == "/pending") {
      setTotalNum(savedTasks.filter((task) => !task.completed).length);
    } else if (location.pathname == "/completed") {
      setTotalNum(savedTasks.filter((task) => task.completed).length)
    }
  });
  let [editTask, setEditTask] = useState("");
  
  let [savedTasks, setSavedTasks] = useState(() => {
    let savedTasks = localStorage.getItem("savedTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  useEffect(() => {
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
  }, [savedTasks]);

  return (
    <TasksContext.Provider
      value={{ savedTasks, setSavedTasks, editTask, setEditTask, setTotalNum }}
    >
      <div className="main">
        <div className="title">To-Do List</div>
        <TodoInput />
        <nav className="navBar">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `link  ${isActive ? "linkAct" : "linkDis"}`
            }
          >
            <i className="fa-solid fa-list-check"></i>All
          </NavLink>
          <NavLink
            to="/pending"
            className={({ isActive }) =>
              `link  ${isActive ? "linkAct" : "linkDis"}`
            }
          >
            <i className="fa-solid fa-list"></i>Pending
          </NavLink>
          <NavLink
            to="/completed"
            className={({ isActive }) =>
              `link  ${isActive ? "linkAct" : "linkDis"}`
            }
          >
            <i className="fa-solid fa-check"></i>Completed
          </NavLink>
          <div className="num">{totalNum}</div>
        </nav>

        <Routes>
          <Route path="/" element={<AllTask />} />
          <Route path="/pending" element={<PendingTask />} />
          <Route path="/completed" element={<CompletedTask />} />
        </Routes>
      </div>
    </TasksContext.Provider>
  );
}

export default App;
