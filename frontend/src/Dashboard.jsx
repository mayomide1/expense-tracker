import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  const [addTransaction, setAddTransaction] = useState(false);
  const [isExpenseOrIncome, setIsExpenseOrIncome] = useState("expense")

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const todayDate = new Date().toLocaleDateString();

  return (
    <div className="dash">
      <Sidebar />

      <main className="dash-main">
        <header className="dash-header">
          <h2>Dashboard</h2>
          <p>{todayDate}</p>
          <button onClick={() => setAddTransaction(!addTransaction)}>
            Add transaction
          </button>
        </header>

        <section className="dash-content">
          <div>
            <div className="balance trans-card"></div>
            <div className="income trans-card"></div>
            <div className="expense trans-card"></div>
          </div>
        </section>

        {addTransaction && (
          <div>
            <h2>Add Transaction</h2>
            <button onClick={() => setAddTransaction(false)}>Close</button>
            <div>
                <button onClick={() => setIsExpenseOrIncome("expense")}>Expense</button>
                <button onClick={() => setIsExpenseOrIncome("income")}>Income</button>
            </div>
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              placeholder="₦0.00"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              placeholder="What was it for?"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              <div className="category">
                <label htmlFor="category">Category</label>
                <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                  {isExpenseOrIncome === "expense" ? (
                    <>
                      <option value="food">Food</option>
                      <option value="transport">Transport</option>
                      <option value="bills">Bills</option>
                      <option value="others">Others</option>
                    </>
                  ) : (
                    <>
                      <option value="salary">Salary</option>
                      <option value="freelance">Freelance</option>
                      <option value="investment">Investment</option>
                      <option value="others">Others</option>                  
                    </>
                  )}
                </select>
              </div>
              <div className="date">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
              </div>

              <div>
                <button onClick={() => setAddTransaction(false)}>Cancel</button>
                <button>Add Transaction</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;
