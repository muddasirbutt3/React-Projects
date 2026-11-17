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
      background: theme ? "#FFFFFF" : "#18181B",
      border: theme ? "1px solid #E4E4E7" : "1px solid #27272A",
      color: theme ? "#18181B" : "#FAFAFA",
    }),
    searchBtn: (theme) => ({
      background: "#2563EB",
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
