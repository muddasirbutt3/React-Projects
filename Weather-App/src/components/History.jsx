import React from "react";
import "./History.css";

export const History = ({ prevSearches, setPrevSearches, theme }) => {
  const style = {
    history: (theme) => ({
      background: theme ? "#FAFAFA" : "#18181B",
      border: theme ? "1px solid #E4E4E7" : "1px solid #27272A",
    }),
    item: (theme) => ({
      background: theme ? "#FFFFFF" : "#111113",
      border: theme ? "1px solid #E4E4E7" : "1px solid #27272A",
      color: theme ? "#18181B" : "#FAFAFA",
    }),
    searchBtn: (theme) => ({
      background: "transparent",
      color: theme ? "#71717A" : "#A1A1AA",
      border: "none",
    }),
    noHistory: (theme) => ({
      background: theme ? "#FAFAFA" : "#18181B",
      color: theme ? "#71717A" : "#A1A1AA",
      border: theme ? "1px solid #E4E4E7" : "1px solid #27272A",
    }),
  };
  function handleClick(id) {
    setPrevSearches(prevSearches.filter((_, index) => index != id));
  }

  if (prevSearches.length == 0) {
    return (
      <p className="noHistory" style={style.item(theme)}>
        No previous Searches.
      </p>
    );
  }
  return (
    <div className="history" style={style.history(theme)}>
      {prevSearches.map((search, index) => (
        <div className="historyItem" key={index} style={style.item(theme)}>
          {search}
          <button
            onClick={() => handleClick(index)}
            style={style.searchBtn(theme)}
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      ))}
    </div>
  );
};
