import { useEffect, useState } from "react";
import "./App.css";
import { WeatherInput } from "./components/WeatherInput";
import { History } from "./components/History";
import { WeatherCard } from "./components/WeatherCard";
import { Routes, Route, NavLink } from "react-router-dom";

function App() {
  let [weather, setWheather] = useState(null);
  let [isFirst, setIsFirst] = useState(true);
  let [theme, setTheme] = useState(true);
  let [unit, setUnit] = useState(true);
  let [prevSearches, setPrevSearches] = useState(() => {
    let prevSearch = localStorage.getItem("prevSearch");
    return prevSearch ? JSON.parse(prevSearch) : [];
  });
  const themeStyle = {
    main: (theme) => ({
      background: theme ? "#FFFFFF" : "#131A2E",
      border: theme ? "1px solid #E2E8F0" : "1px solid #263052",
    }),
    themebtn: (theme) => ({
      background: theme ? "#F1F5F9" : "#1B2440",
      border: theme ? "1px solid #E2E8F0" : "1px solid #263052",
    }),
    unit: (theme) => ({
      background: theme ? "#F1F5F9" : "#1B2440",
      border: theme ? "1px solid #E2E8F0" : "1px solid #263052",
    }),
    title: (theme) => ({
      color: theme ? "#0F172A" : "#E6EAF5",
    }),
    nav: (theme) => ({
      background: theme ? "#F1F5F9" : "#1B2440",
      border: theme ? "1px solid #E2E8F0" : "1px solid #263052",
    }),
  };
  document.body.style.backgroundColor = theme ? "#EEF2FF" : "#0B1020";
  useEffect(() => {
    localStorage.setItem("prevSearch", JSON.stringify(prevSearches));
  }, [prevSearches]);

  return (
    <div className="main" style={themeStyle.main(theme)}>
      <div className="title-toggles">
        <div className="title" style={themeStyle.title(theme)}>
          Weather App
        </div>
        <div className="toggles">
          <div
            className="units"
            onClick={() => setUnit(!unit)}
            style={themeStyle.unit(theme)}
          >
            °C / °F
          </div>
          <div
            className="theme"
            onClick={() => setTheme(!theme)}
            style={themeStyle.themebtn(theme)}
          >
            {theme ? (
              <i className="fa-solid fa-moon"></i>
            ) : (
              <i className="fa-solid fa-sun"></i>
            )}
          </div>
        </div>
      </div>
      <WeatherInput
        theme={theme}
        setIsFirst={setIsFirst}
        setPrevSearches={setPrevSearches}
        setWheather={setWheather}
      />
      <nav className="tabs" style={themeStyle.nav(theme)}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `link ${isActive ? "active" : "unActive"}`
          }
        >
          Weather
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `link ${isActive ? "active" : "unActive"}`
          }
        >
          History
        </NavLink>
      </nav>
      <div className="display">
        <Routes>
          <Route
            path="/"
            element={
              <WeatherCard
                theme={theme}
                unit={unit}
                data={weather}
                isFirst={isFirst}
              />
            }
          />
          <Route
            path="/history"
            element={
              <History
                theme={theme}
                prevSearches={prevSearches}
                setPrevSearches={setPrevSearches}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
