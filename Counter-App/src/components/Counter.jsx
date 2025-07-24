import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "./Counter.css";

function Counter() {
  let [count, setCount] = useState(0);
  let { theme } = useContext(ThemeContext);

  return (
    <>
      <div className={`main ${theme ? "dark-main" : ""}`}>
        <h1 className="title">Counting App</h1>
        <div className={`show ${theme ? "dark-box" : ""}`}>{count}</div>

        <div className={`btn-groups ${theme ? "dark-group" : ""}`}>
          <button
            onClick={() => setCount((prev) => prev - 1)}
            className={count < -99 ? "disable" : ""}
            disabled={count <= -99}
          >
            ➖
          </button>

          <button onClick={() => setCount(0)}>🔄</button>

          <button
            onClick={() => setCount((prev) => prev + 1)}
            className={count > 99 ? "disable" : ""}
            disabled={count >= 99}
          >
            ➕
          </button>
        </div>
      </div>
    </>
  );
}
export default Counter;
