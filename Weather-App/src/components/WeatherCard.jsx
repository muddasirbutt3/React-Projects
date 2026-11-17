import React from "react";
import "./WeatherCard.css";

export const WeatherCard = ({ data, unit, isFirst, theme }) => {
  const style = {
    first: (theme) => ({
      background: theme ? "#FAFAFA" : "#18181B",
      border: theme ? "1px solid #E4E4E7" : "1px solid #27272A",
    }),
    weather: (theme) => ({
      background: theme ? "#FAFAFA" : "#18181B",
      border: theme ? "1px solid #E4E4E7" : "1px solid #27272A",
      color: theme ? "#18181B" : "#FAFAFA",
    }),
    text: (theme) => ({
      color: theme ? "#18181B" : "#FAFAFA",
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
