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
  const isEditing = edit != "";

  // Today's date as YYYY-MM-DD with zero-padded month and day
  let currDate = new Date();
  let datevalue = `${currDate.getFullYear()}-${String(
    currDate.getMonth() + 1,
  ).padStart(2, "0")}-${String(currDate.getDate()).padStart(2, "0")}`;

  let [name, setName] = useState(() => (isEditing ? edit.name : ""));
  let [amount, setAmonut] = useState(() => (isEditing ? edit.amount : ""));
  let [category, setCategory] = useState(() =>
    isEditing ? edit.category : "",
  );
  let [date, setDate] = useState(() => (isEditing ? edit.date : datevalue));
  let formTag = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    let form = new FormData(formTag.current);
    let fromData = {
      ...Object.fromEntries(form.entries()),
      // keep the original id when editing
      id: isEditing ? edit.id : Date.now(),
    };

    const validAmount = Number(fromData.amount);
    if (
      fromData.name.trim() === "" ||
      fromData.amount.trim() === "" ||
      !Number.isFinite(validAmount) ||
      validAmount <= 0 ||
      fromData.category === "" ||
      fromData.date === ""
    )
      return;

    isEditing
      ? setData(data.map((ele) => (ele.id === edit.id ? fromData : ele)))
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
          <h1>{isEditing ? "Edit Expense" : "Add Expense"}</h1>
          <button type="button" className="cancel" onClick={handleClick}>
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
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
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
          {isEditing ? "Save Changes" : "Add Expense"}
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
