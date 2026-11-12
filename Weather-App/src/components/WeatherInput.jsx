import React, { useState } from "react";
import axios from "axios";
import "./WeatherInput.css";

export const WeatherInput = ({
  setWheather,
  setPrevSearches,
  setIsFirst,
  theme,
}) => {
  const style = {
    input: (theme) => ({
      background: theme ? "#F1F5F9" : "#1B2440",
      border: theme ? "1px solid #E2E8F0" : "1px solid #263052",
      color: theme ? "#0F172A" : "#E6EAF5",
    }),
    searchBtn: (theme) => ({
      background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
      border: "none",
    }),
  };
  let [value, setValue] = useState("");
  function handleChange(e) {
    setValue(e.target.value);
  }
  let api_key = "932a0775642e6a74689629b7089e2d39";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${value.trim()}&units=metric&appid=${api_key}`;
  function handleSearch() {
    if (!value.trim()) return;
    setPrevSearches((prev) => [...prev, value]);
    setValue("");
    axios
      .get(api)
      .then((res) => {
        console.log(res.data);
        setWheather(res.data);
        setIsFirst(false);
      })
      .catch((err) => {
        if ((err.response.data.cod = "404")) {
          setWheather(err.response.data.message);
        }
        setIsFirst(false);
      });
  }
  return (
    <div className="search">
      <input
        type="text"
        className="input"
        onKeyDown={(e) => {
          if (e.key == "Enter") handleSearch();
        }}
        onChange={(e) => handleChange(e)}
        placeholder="Enter city name"
        value={value}
        style={style.input(theme)}
      />
      <button
        className="btn"
        onClick={handleSearch}
        style={style.searchBtn(theme)}
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
};
