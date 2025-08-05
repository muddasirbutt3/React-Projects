import React from "react";
import "./ExpenseList.css";

function ExpenseList({
  data,
  setData,
  close,
  edit,
  search,
  setSearch,
  setSearchResult,
  isSearch,
}) {
  function handleEdit(id) {
    let ind = data.findIndex((ele) => ele.id == id);
    if (ind !== -1) {
      let newData = data[ind];
      edit({ ...newData, index: ind });
    }
    close(true);
  }

  function handleDel(id) {
    setData(data.filter((ele) => ele.id != id));
    setSearch("");
    setSearchResult(null);
  }
  return (
    <div className="lists">
      <nav className="nav">
        <div className="item-id">ID</div>
        <div className="item-name">Name</div>
        <div className="item-amount">Amount</div>
        <div className="item-date">Date</div>
        <div className="item-category">Category</div>
        <div className="item-action-btn">Action</div>
      </nav>
      <div className="itembox">
        {(data.length === 0 && search === null ) || (search !== null && search.length === 0 ) ? (
          <div className="noexpense">
            <p>No expense</p>
            <button onClick={() => close(true)}>Add Expense</button>
          </div>
        ) : (
          (search !== null ? search : data).map((expense, index) => (
            <div className="items" key={expense.id}>
              <div className="item-id item-div">
                <div className="onmobile">ID</div>
                {index + 1}
              </div>
              <div className="item-name item-div">
                <div className="onmobile">Name</div>
                {expense.name}
              </div>
              <div className="item-amount item-div">
                <div className="onmobile">Amount</div>
                {expense.amount}
              </div>
              <div className="item-date item-div">
                <div className="onmobile">Date</div>
                {expense.date}
              </div>
              <div className="item-category item-div">
                <div className="onmobile">Category</div>
                {expense.category}
              </div>
              <div className="item-action-btn item-div">
                <button onClick={() => handleEdit(expense.id)} id="edit">
                  Edit
                </button>
                <button onClick={() => handleDel(expense.id)} id="del">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseList;
