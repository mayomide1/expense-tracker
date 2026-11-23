import Sidebar from "./Sidebar"
import "./Transactions.css";


const Transactions = () => {
  return (
    <div className="transaction">
      <Sidebar />

      <main className="transaction-main">
        <header className="transaction-header">
          <h2>Transactions</h2>
        </header>

        <section className="transaction-content">
          {/* Transaction content goes here */}
        </section>
      </main>
    </div>
  )
}

export default Transactions