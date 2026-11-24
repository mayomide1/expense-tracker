import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "./Sidebar";
import "./Transactions.css";

const api = import.meta.env.VITE_API_URL;

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  async function handleGetTransactions() {
    try {
      const token = localStorage.getItem("token");

      setLoading(true);

      const response = await axios.get(`${api}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setTransactions(response.data);
    } catch (error) {
      const backendMessage = error.response?.data?.message || error.message;
      setError(backendMessage);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGetTransactions();
  }, []);

  return (
    <div className="transaction">
      <Sidebar />

      <main className="transaction-main">
        <header className="transaction-header">
          <h2>Transactions</h2>
        </header>

        <section className="transaction-content">
          <div className="transaction-table-wrapper">
            {loading && (
              <div className="transaction-state" role="status">
                <span className="transaction-spinner" aria-hidden="true"></span>
                <p>Loading...</p>
              </div>
            )}

            {error && (
              <div className="transaction-state">
                <p className="transaction-error" role="alert">
                  {error}
                </p>
              </div>
            )}

            {!loading && !error && transactions.length === 0 && (
              <div className="transaction-state transaction-empty">
                <h3>No transactions yet</h3>
                <p>
                  Start tracking your income and expenses by adding your first
                  transaction.
                </p>
                <button className="transaction-btn transaction-btn-primary">
                  Add Transaction
                </button>
              </div>
            )}

            {!loading && !error && (
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => {
                    return (
                      <tr key={transaction._id}>
                        <td
                          className={`transaction-amount transaction-amount-${transaction.type}`}
                        >
                          ₦{transaction.amount.toLocaleString()}
                        </td>
                        <td>
                          <span
                            className={`transaction-badge transaction-badge-${transaction.type}`}
                          >
                            {transaction.type}
                          </span>
                        </td>
                        <td className="transaction-category">
                          {transaction.category}
                        </td>
                        <td>{transaction.description}</td>
                        <td className="transaction-date">{transaction.date}</td>
                        <td>
                          <div className="transaction-actions">
                            <button className="transaction-btn transaction-btn-edit">
                              Edit
                            </button>
                            <button className="transaction-btn transaction-btn-delete">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Transactions;