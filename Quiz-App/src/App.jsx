import { useState } from "react";
import { Form, Questions,Result } from "./components";
import "./App.css";

function App() {
  const [data, setData] = useState();
  const [popUp, setPopUp] = useState("form");
  let [score, setScore] = useState(0);
  let [userOPtions, setUserOPtions] = useState([]);

  return (
    <>
      <div className="main">
        {popUp == "form" && <Form setData={setData} setPopUp={setPopUp}/>}
        {popUp == "question" && <Questions score={setScore} setUserArr={setUserOPtions} data={data} setPopUp={setPopUp}/>}
        {popUp == "result" && <Result setPopUp={setPopUp} score={score} setUserArr={setUserOPtions} data={data} userArr={userOPtions}/>}
      </div>

    </>
  );
}

export default App;
