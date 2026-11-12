import React from "react";
import "./History.css";

export const History = ({ prevSearches, setPrevSearches, theme }) => {
  const style = {
    history: (theme) => ({
      background: theme ? "#F1F5F9" : "#1B2440",
      border: theme ? "1px solid #E2E8F0" : "1px solid #263052",
    }),
    item: (theme) => ({
      background: theme ? "#FFFFFF" : "#131A2E",
      border: theme ? "1px solid #E2E8F0" : "1px solid #263052",
      color: theme ? "#0F172A" : "#E6EAF5",
    }),
    searchBtn: (theme) => ({
      background: theme ? "#EEF2FF" : "#263052",
      color: theme ? "#6366F1" : "#A5B4FC",
      border: "none",
    }),
    noHistory: (theme) => ({
      background: theme ? "#F1F5F9" : "#1B2440",
      color: theme ? "#64748B" : "#8B95B5",
      border: theme ? "1px solid #E2E8F0" : "1px solid #263052",
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
