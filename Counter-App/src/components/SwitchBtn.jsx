import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const SwitchBtn = () => {
  let { theme, setTheme } = useContext(ThemeContext);
  const themeStyle = {
    Btn: (theme) => ({
      userSelect: "none",
      position: "absolute",
      top: "20px",
      left: "20px",
      padding: "6px",
      textAlign: "center",
      alignContent: "center",
      borderRadius: "8px",
      backgroundColor: theme ? '#2D2D2D' : '#D6D8DA',
      cursor: "pointer",
      fontSize: "20px",
      transition: "background 0.3s ease-in",
    }),
  };
  return (
    <div
      onClick={() => setTheme((prev) => !prev)}
      style={themeStyle.Btn(theme)}
      className={`switch-btn ${theme ? "switch-btn-dark" : ""}`}
    >
      {theme ? "☀️" : "🌚"}
    </div>
  );
};
