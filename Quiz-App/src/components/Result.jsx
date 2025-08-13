import React from "react";
import "./Result.css";

function Result({ setPopUp, data, userArr, score, setUserArr }) {
  console.log(data);
  console.log(userArr);

  function handleClick() {
    setPopUp("form");
    setUserArr([]);
  }
  return (
    <div className="result">
      <div className="head">Your Score:</div>
      <div className="score">{score} Out of {data.length}</div>
      <div className="ans-keys">
        {userArr.map((ele, ind) => (
          <div className="key" key={ind}>
            <p
              className="correct"
              dangerouslySetInnerHTML={{
                __html: data[ind].correct_answer,
              }}
            />
            <p
              className="user"
              dangerouslySetInnerHTML={{
                __html: ele ? ele : 'No selected.',
              }}
              style={{
                backgroundColor:
                  data[ind].correct_answer == ele ? "#49976d61" : "#dc354687",
                border:
                  data[ind].correct_answer == ele
                    ? "1px solid #49976e"
                    : "1px solid #dc3545",
              }}
            />
          </div>
        ))}
      </div>
      <button onClick={() => handleClick()} className="again">
        Play Again
      </button>
    </div>
  );
}

export default Result;
