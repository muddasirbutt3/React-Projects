import { ExpenseForm, ExpenseList, Report } from "./components";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  let [edit, setEdit] = useState("");
  let [search, setSearch] = useState("");
  const expensesdata = [
    {
      name: "Breakfast",
      amount: "350",
      category: "Food",
      date: "2025-08-04",
      id: 1754310109601,
    },
    {
      name: "Taxi Ride",
      amount: "1200",
      category: "Travel",
      date: "2025-08-04",
      id: 1754310109602,
    },
    {
      name: "Shoes",
      amount: "4500",
      category: "Shopping",
      date: "2025-08-03",
      id: 1754310109603,
    },
    {
      name: "Electricity Bill",
      amount: "3000",
      category: "Bills & Utilities",
      date: "2025-08-02",
      id: 1754310109604,
    },
    {
      name: "Movie Ticket",
      amount: "900",
      category: "Entertainment",
      date: "2025-08-02",
      id: 1754310109605,
    },
    {
      name: "Coffee",
      amount: "250",
      category: "Food",
      date: "2025-08-02",
      id: 1754310109606,
    },
    {
      name: "Bus Ticket",
      amount: "150",
      category: "Travel",
      date: "2025-08-01",
      id: 1754310109607,
    },
    {
      name: "T-Shirt",
      amount: "1500",
      category: "Shopping",
      date: "2025-08-01",
      id: 1754310109608,
    },
    {
      name: "Water Bill",
      amount: "500",
      category: "Bills & Utilities",
      date: "2025-08-01",
      id: 1754310109609,
    },
    {
      name: "Concert",
      amount: "2000",
      category: "Entertainment",
      date: "2025-07-31",
      id: 1754310109610,
    },
    {
      name: "Donation",
      amount: "1000",
      category: "Other",
      date: "2025-07-30",
      id: 1754310109611,
    },
    {
      name: "Snacks",
      amount: "300",
      category: "Food",
      date: "2025-07-30",
      id: 1754310109612,
    },
    {
      name: "Flight Ticket",
      amount: "12000",
      category: "Travel",
      date: "2025-07-29",
      id: 1754310109613,
    },
    {
      name: "Headphones",
      amount: "2500",
      category: "Shopping",
      date: "2025-07-29",
      id: 1754310109614,
    },
    {
      name: "Internet Bill",
      amount: "2000",
      category: "Bills & Utilities",
      date: "2025-07-28",
      id: 1754310109615,
    },
    {
      name: "Theme Park",
      amount: "3500",
      category: "Entertainment",
      date: "2025-07-28",
      id: 1754310109616,
    },
    {
      name: "Charity",
      amount: "500",
      category: "Other",
      date: "2025-07-27",
      id: 1754310109617,
    },
  ];
  let [savedExpense, setSavedExpense] = useState(() => {
    let expenses = localStorage.getItem("expenses");
    return expenses ? JSON.parse(expenses) : [];
  });
  let [searchResult, setSearchResult] = useState(null);

  function handleClick(term) {
  if (term.trim() === "") {
    setSearchResult([]); 
    return;
  }
  const result = savedExpense.filter((ele) =>
    ele.name.toLowerCase().includes(term.toLowerCase())
  );
  setSearchResult(result);
}

  const [showPopup, setShowPopup] = useState(false);
  const [ShowReport, setShowReport] = useState(false);
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(savedExpense));
  }, [savedExpense]);

  return (
    <>
      {showPopup && (
        <ExpenseForm
          edit={edit}
          setEdit={setEdit}
          close={setShowPopup}
          data={savedExpense}
          setData={setSavedExpense}
          setSearchResult={setSearchResult}
          setSearch={setSearch}
        />
      )}
      {ShowReport && <Report setPopUp={setShowReport} data={savedExpense} />}
      <div className={`main `}>
        <h1>Personal Expense manager</h1>
        <div className="feilds">
          <div className="action-group">
            <button id="add" onClick={() => setShowPopup(true)}>
              Add Expense
            </button>
            <button id="report" onClick={() => setShowReport(true)}>
              Expense Report
            </button>
          </div>
          <div className="search-group">
            <input
              placeholder="Search"
              type="text"
              onKeyDown={(e) => {
                if (e.key == "Enter") handleClick(search);
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => handleClick(search)}>Search</button>
          </div>
        </div>
        <ExpenseList
          data={savedExpense}
          close={setShowPopup}
          edit={setEdit}
          search={searchResult}
          setSearch={setSearch}
          setSearchResult={setSearchResult}
          setData={setSavedExpense}
        />
      </div>
    </>
  );
}

export default App;
