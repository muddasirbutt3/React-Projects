import React, { useEffect, useRef, useState } from "react";
import "./Questions.css";

function Questions({ data, setPopUp, setUserArr, score }) {
  let [count, setCount] = useState(0);
  let [timer, setTimer] = useState(30);
  let [line, setLine] = useState(0);
  let [userSelected, setUserSelected] = useState(null);
  let [option, setOption] = useState([]);

  useEffect(() => {
    console.log(count);
    if (count + 1 > data.length) return;
    let shuffled = [
      ...data[count].incorrect_answers,
      data[count].correct_answer,
    ];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    console.log(data[count].correct_answer);
    setOption(shuffled);
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          handleNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  function handleNext() {
    setCount((prev) => prev + 1);

    setLine((prev) => prev + 100 / data.length);
    if (option[userSelected] === data[count].correct_answer) {
      score((prev) => prev + 1);
    }
    setUserArr((prev) => [...prev, option[userSelected]]);
    setUserSelected(null);
    if (count + 1 == data.length) {
      setPopUp("result");
    }
  }

  function handleSelect(id) {
    setUserSelected(id);
  }
  function handleQuit() {
    setPopUp("result");
  }

  return (
    <div className="question">
      <div className="num-time">
        <div className="num">
          {count + 1} of {data.length} Question
        </div>
        <div className="timer">{timer}</div>
      </div>
      <div className="progess">
        <div className="line" style={{ width: `${line}%` }}></div>
      </div>
      <div
        className="ques"
        dangerouslySetInnerHTML={{
          __html: count + 1 > data.length ? "" : data[count].question,
        }}
      />
      <div className="opts">
        {option.map((opt, ind) => (
          <div
            key={ind}
            className="opt"
            onClick={() => handleSelect(ind)}
            style={{
              backgroundColor: userSelected == ind ? "#d4edda" : "#ffffffff",
              border:
                userSelected === ind
                  ? "1px solid #29aa47ff"
                  : "1px solid black",
            }}
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        ))}
      </div>
      <div className="btns">
        <button onClick={handleQuit} className="quit">
          Quit
        </button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default Questions;
