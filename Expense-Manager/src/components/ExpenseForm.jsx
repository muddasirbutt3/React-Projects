import React, { useRef, useState } from "react";
import "./ExpenseForm.css";

function ExpenseForm({
  data,
  setData,
  close,
  edit,
  setEdit,
  setSearch,
  setSearchResult,
}) {
  let currDate = new Date();
  let datevalue = `${currDate.getFullYear()}-${
    currDate.getMonth() + 1 < 9
      ? "0" + (currDate.getMonth() + 1)
      : currDate.getMonth() + 1
  }-${
    currDate.getDate() + 1 < 9 ? "0" + currDate.getDate() : currDate.getDate()
  }`;
  let [name, setName] = useState(() => (edit != "" ? edit.name : ""));
  let [amount, setAmonut] = useState(() => (edit != "" ? edit.amount : ""));
  let [category, setCategory] = useState(() =>
    edit != "" ? edit.category : ""
  );
  let [date, setDate] = useState(() => (edit != "" ? edit.date : datevalue));
  let formTag = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    let form = new FormData(formTag.current);
    let fromData = { ...Object.fromEntries(form.entries()), id: Date.now() };
    console.log(fromData);

    let isEmpty = Object.values(fromData).some((value) =>
      isNaN(value) ? value.trim() === "" : value == ""
    );
    if (isEmpty) return;
    edit != ""
      ? setData(data.map((ele, ind) => (ind === edit.index ? fromData : ele)))
      : setData((prev) => [...prev, fromData]);
    setEdit("");
    formTag.current.reset();
    setSearch("");
    setSearchResult(null);
    close(false);
  }
  function handleClick() {
    close(false);
    setEdit("");
  }
  return (
    <div className="page">
      <form className="form" onSubmit={(e) => handleSubmit(e)} ref={formTag}>
        <div className="group-title">
          <h1>Add Expense</h1>
          <button className="cancel" onClick={handleClick}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          placeholder="Expense Name"
        />
        <input
          type="text"
          onChange={(e) => setAmonut(e.target.value)}
          value={amount}
          name="amount"
          placeholder="Amount"
        />
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          id="category"
        >
          <option value="">--Select Category--</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Health">Health</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills & Utilities">Bills & Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          name="date"
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
        <button type="submit" className="btn">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
