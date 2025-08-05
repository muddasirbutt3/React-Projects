import React from "react";
import "./Report.css";

function Report({ setPopUp, data }) {
  const total = data.reduce((acc, item) => acc + Number(item.amount), 0);
  console.log(total);
  const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Health",
    "Bills & Utilities",
    "Entertainment",
    "Other",
  ];
  const categoryTotals = categories.map((cat) => ({
    category:cat,
    amount : data
    .filter((item) => item.category == cat)
    .reduce((acc,i) => acc + Number(i.amount),0)
  }))
  console.log(categoryTotals);
  return (
    <div className="report">
      <div className="stats">
        <div className="reportnav">
          <div className="category">Category</div>
          <div className="amount">Amount</div>
        </div>
        <div className="report-sec">
          {total == 0 ? <div className="norecord">
            <p>No expense</p>
          </div> : categoryTotals.map((cat,i) => (
            <div className="report-item" key={i}>
              <p>{cat.category}</p>
              <p>{`${cat.amount}  (${isNaN(cat.amount /total * 100) ? '0' : ( cat.amount /total * 100).toFixed(0)}%)` } </p>
            </div>
          ))}
        </div>
        <div className="total">
          <p>Total Expenses:</p> <div className="total-amount">{total} PKR</div>
        </div>
        <button className="close" onClick={() => setPopUp(false)}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Report;
