import { ExpenseForm, ExpenseList, Report } from "./components";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  let [edit, setEdit] = useState("");
  let [search, setSearch] = useState("");
  let [savedExpense, setSavedExpense] = useState(() => {
    let expenses = localStorage.getItem("expenses");
    return expenses ? JSON.parse(expenses) : [];
  });
  let [searchResult, setSearchResult] = useState(null);

  function handleClick(term) {
    // Empty search -> go back to showing the full list
    if (term.trim() === "") {
      setSearchResult(null);
      return;
    }
    const result = savedExpense.filter((ele) =>
      ele.name.toLowerCase().includes(term.toLowerCase()),
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
