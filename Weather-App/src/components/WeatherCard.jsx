import React from "react";
import "./WeatherCard.css";

export const WeatherCard = ({ data, unit, isFirst, theme }) => {
  const style = {
    first: (theme) => ({
      background: theme ? "#F3F4F6" : "#23252a",
      border: theme ? "1px solid #E5E7EB" : "1px solid #121820ff",
    }),
    weather: (theme) => ({
      background: theme ? "#d3d5daff" : "#23252a",
      border: theme ? "1px solid #E5E7EB" : "1px solid #121820ff",
    }),
    text: (theme) => ({
      color: theme ? "#23252a":"#d3d5daff"  ,
    }),
    weather: (theme) => ({
      background: theme ? "#d3d5daff" : "#23252a",
      border: theme ? "1px solid #E5E7EB" : "1px solid #121820ff",
    }),
    weather: (theme) => ({
      background: theme ? "#d3d5daff" : "#23252a",
      border: theme ? "1px solid #E5E7EB" : "1px solid #121820ff",
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
  
  if (data == 'city not found') {
    return (
      <div className="box" style={style.first(theme)}>
        <img src="/404.png" className="img69"/>
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
      <div className="desc" style={style.text(theme)}>{data.weather[0].description}</div>
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
