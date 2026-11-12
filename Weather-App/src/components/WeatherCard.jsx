import React from "react";
import "./WeatherCard.css";

export const WeatherCard = ({ data, unit, isFirst, theme }) => {
  const style = {
    first: (theme) => ({
      background: theme ? "#F1F5F9" : "#1B2440",
      border: theme ? "1px solid #E2E8F0" : "1px solid #263052",
    }),
    weather: (theme) => ({
      background: theme
        ? "linear-gradient(160deg, #6366F1, #8B5CF6)"
        : "linear-gradient(160deg, #312E81, #1E1B4B)",
      border: theme ? "1px solid #E2E8F0" : "1px solid #263052",
      boxShadow: "0 14px 30px rgba(99, 102, 241, 0.3)",
    }),
    text: (theme) => ({
      color: "#FFFFFF",
    }),
  };
  if (isFirst) {
    return (
      <div className="box" style={style.first(theme)}>
        <img src="/first.png" />
        <p>Search for a city to see the weather.</p>
      </div>
    );
  }

  if (data == "city not found") {
    return (
      <div className="box" style={style.first(theme)}>
        <img src="/404.png" className="img69" />
        <p>No city found.</p>
      </div>
    );
  }
  return (
    <div className="weather" style={style.weather(theme)}>
      <div className="img">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
        />
      </div>
      <div className="temp" style={style.text(theme)}>
        {unit
          ? `${data.main.temp}°C`
          : `${((data.main.temp * 9) / 5 + 32).toFixed(2)}°F`}
      </div>
      <div className="city" style={style.text(theme)}>
        {data.name}, {data.sys.country}
      </div>
      <div className="desc" style={style.text(theme)}>
        {data.weather[0].description}
      </div>
      <div className="group">
        <div className="item item1">
          <div className="icon">
            <i className="fa-solid fa-droplet"></i>
          </div>
          <div className="text">
            <p className="value">{data.main.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
        <div className="item">
          <div className="icon">
            <i className="fa-solid fa-wind"></i>
          </div>
          <div className="text">
            <p className="value">{data.wind.speed} km/h</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};
