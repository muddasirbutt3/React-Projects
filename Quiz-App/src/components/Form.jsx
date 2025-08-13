import React, { useRef, useState } from "react";
import axios from "axios";
import "./form.css";

function Form({ setData, setPopUp }) {
  let [amount, setAmount] = useState(10);
  let [category, setCategory] = useState("any");
  let [difficulty, setDifficulty] = useState("any");
  let baseURL = `https://opentdb.com/api.php?`;
  const errorDiv = useRef();
  function error(message) {
    errorDiv.current.textContent = message;
    errorDiv.current.style.display = "block";
    setTimeout(() => {
      errorDiv.current.style.display = "none";
    }, 2000);
  }
  function getURL(e) {
    e.preventDefault();
    baseURL += `amount=${amount}`;
    if (category != "any") {
      baseURL += `&category=${category}`;
    }
    if (difficulty != "any") {
      baseURL += `&difficulty=${difficulty}`;
    }
    baseURL += `&type=multiple`;
    axios
      .get(baseURL)
      .then((res) => {
        console.log(res.data);
        setData(res.data.results);
        setPopUp("question");
        baseURL = `https://opentdb.com/api.php?`;
      })
      .catch((err) => {
        error(err.message);
        console.log(err);
      });
  }
  return (
    <form className="form" method="post">
      <div className="heading">Quiz App</div>
      <label htmlFor="amount">Number of Questions:</label>
      <input
        type="number"
        name="amount"
        id="amount"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <label htmlFor="category">Select Category:</label>
      <select
        name="category"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="any">Any Category</option>
        <option value="9">General Knowledge</option>
        <option value="10">Entertainment: Books</option>
        <option value="11">Entertainment: Film</option>
        <option value="12">Entertainment: Music</option>
        <option value="13">Entertainment: Musicals &amp; Theatres</option>
        <option value="14">Entertainment: Television</option>
        <option value="15">Entertainment: Video Games</option>
        <option value="16">Entertainment: Board Games</option>
        <option value="17">Science &amp; Nature</option>
        <option value="18">Science: Computers</option>
        <option value="19">Science: Mathematics</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
        <option value="25">Art</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
        <option value="29">Entertainment: Comics</option>
        <option value="30">Science: Gadgets</option>
        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
        <option value="32">Entertainment: Cartoon &amp; Animations</option>{" "}
      </select>
      <label htmlFor="difficulty">Select Difficulty:</label>
      <select
        name="difficulty"
        id="difficulty"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="any">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button type="submit" onClick={(e) => getURL(e)}>
        Start Quiz
      </button>
      <div className="error" ref={errorDiv} style={{display:'none'}}>
      </div>
    </form>
  );
}

export default Form;
