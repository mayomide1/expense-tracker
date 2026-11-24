import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import "../css/Dashboard.css";

import { IoMdAdd } from "react-icons/io";

const api = import.meta.env.VITE_API_URL

const Dashboard = () => {
  const [addTransaction, setAddTransaction] = useState(false);
  const [isExpenseOrIncome, setIsExpenseOrIncome] = useState("expense")

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const type = isExpenseOrIncome

  

  async function handleAddTransaction(){
    const response = await axios.post(`${api}/transaction`, {amount, description, category, date, type})
    console.log(amount)
    console.log(description)
    console.log(category)
    console.log(date)
    console.log(type)
  }

  return (
    <div className={`dash`}>
      <Sidebar />

      <main className="dash-main">
        <header className="dash-header">
          <h2>Dashboard</h2>
          <Link to="/add-transaction">
          <button onClick={() => setAddTransaction(!addTransaction)}>
            <IoMdAdd/>Add transaction
          </button>
          </Link>
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
              placeholder="₦ 0.00"
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
                <button onClick={() => handleAddTransaction()}>Add Transaction</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;
