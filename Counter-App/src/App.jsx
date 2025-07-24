import { useState } from "react";
import "./App.css";
import Counter from "./components/Counter.jsx";
import { SwitchBtn } from "./components/SwitchBtn.jsx";
import { ThemeContext } from "./context/ThemeContext.jsx";

function App() {
  let [theme, setTheme] = useState(false)
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`body ${theme ? 'dark-body' : ''}`}>
        <SwitchBtn />
        <Counter/>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
