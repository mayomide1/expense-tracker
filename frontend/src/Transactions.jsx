import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "./Sidebar";
import "./Transactions.css";

import { IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Header from "./Header";

const api = import.meta.env.VITE_API_URL;

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
        <Header />
        <header className="transaction-header">
          <h2>Transactions</h2>
          <button><IoMdAdd /> Add transaction</button>
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
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => {
                    return (
                      <tr key={transaction._id}>
                        <td className="transaction-date">{transaction.date}</td>
                        <td>{transaction.description === "" ? "-" : transaction.description}</td>
                        <td className="transaction-category">
                          {transaction.category}
                        </td>
                        <td
                          className={`transaction-amount transaction-amount-${transaction.type}`}
                        >
                          ₦{transaction.amount.toLocaleString()}
                        </td>
                        <td>
                          <div className="transaction-actions">
                            <button className="transaction-btn transaction-btn-edit">
                              <FaEdit/> Edit
                            </button>
                            <button className="transaction-btn transaction-btn-delete">
                              <MdDelete/> Delete
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