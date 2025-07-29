import React from "react";
import "./History.css";

export const History = ({ prevSearches, setPrevSearches,theme }) => {
  const style ={
    history: (theme) => ({
      background: theme ?  '#F3F4F6' : '#282B2F',
      border: theme ?  '1px solid #E5E7EB' : '1px solid #121820ff',
    }),
    item: (theme) => ({
      background: theme ?  '#f9fbffff' : '#27292F',
      border: theme ?  '1px solid #c8caceff' : '1px solid #121820ff',
      color: theme  ? '#111827' : '#F1F5F9',
    }),
    searchBtn: (theme) => ({
      background: theme ?  '#F3F4F6' : '#2d3137ff',
      color: theme  ? '#111827' : '#F1F5F9',
      border: theme ?  '1px solid #c8caceff' : '1px solid #121820ff',
    }),
    noHistory: (theme) => ({
      background: theme ?  '#F3F4F6' : '#2d3137ff',
      color: theme  ? '#111827' : '#F1F5F9',
      border: theme ?  '1px solid #c8caceff' : '1px solid #121820ff',
    }),
  }
  function handleClick(id) {
    setPrevSearches(prevSearches.filter((_, index) => index != id));
  }

  if (prevSearches.length == 0) {
    return <p className="noHistory" style={style.item(theme)}>No previous Searches.</p>;
  }
  return (
    <div className="history" style={style.history(theme)}>
      {prevSearches.map((search, index) => (
        <div className="historyItem" key={index} style={style.item(theme)}>
          {search}
          <button onClick={() => handleClick(index)} style={style.searchBtn(theme)}><i class="fa-solid fa-xmark"></i></button>
        </div>
      ))}
    </div>
  );
};
