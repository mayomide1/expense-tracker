import { Link } from "react-router-dom";

import "../css/Dashboard.css";

import { IoMdAdd } from "react-icons/io";

const categories = [
  { category: "food", amount: 12000 },
  { category: "transport", amount: 10000 },
  { category: "bills", amount: 15000 },
  { category: "others", amount: 24000 },
];

const recentTransactions = [
  { title: "Salary", category: "Income", date: "Nov 1", amount: 450000, type: "income" },
  { title: "Rent", category: "Rent", date: "Nov 2", amount: 50000, type: "expense" },
  { title: "Groceries", category: "Bills", date: "Nov 5", amount: 18200, type: "expense" },
  { title: "Bolt ride", category: "Others", date: "Nov 6", amount: 3500, type: "expense" },
];

const Dashboard = () => {
  const maxAmount = Math.max(...categories.map((c) => c.amount));

  return (
    <div className="dash">
      <main className="dash-main">
        <header className="dash-header">
          <h2>Dashboard</h2>
          <Link to="/add-transaction" className="dash-add">
            <IoMdAdd /> Add transaction
          </Link>
        </header>

        <section className="dash-content">
          {/* ---------- Summary cards ---------- */}
          <div className="dash-stats">
            <div className="dash-card dash-stat dash-stat-balance">
              <h2>Balance</h2>
              <p>₦267,500</p>
            </div>

            <div className="dash-card dash-stat dash-stat-income">
              <h2>Income</h2>
              <p>₦450,000</p>
            </div>

            <div className="dash-card dash-stat dash-stat-expense">
              <h2>Expenses</h2>
              <p>₦182,500</p>
            </div>
          </div>

          <div className="dash-panels">
            <div className="dash-card dash-panel">
              <h3 className="dash-panel-title">Spending by category</h3>

              <div className="dash-category-list">
                {categories.map((item) => (
                  <div className="dash-category " key={item.category}>
                    <div className="dash-category-row">
                      <p className="dash-category-name dash-recent-title">{item.category}</p>
                      <p className="dash-category-amount">
                        ₦{item.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="dash-bar">
                      <div
                        className="dash-bar-fill"
                        style={{ width: `${(item.amount / maxAmount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dash-card dash-panel">
              <h3 className="dash-panel-title">Recent transactions</h3>

              <div className="dash-recent-list">
                {recentTransactions.map((item) => (
                  <div className="dash-recent" key={item.title}>
                    <div className="dash-recent-info">
                      <p className="dash-recent-title">{item.title}</p>
                      <p className="dash-recent-meta">
                        {item.category} · {item.date}
                      </p>
                    </div>
                    <p className={`dash-recent-amount dash-recent-${item.type}`}>
                      {item.type === "income" ? "+" : "-"}₦
                      {item.amount.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;