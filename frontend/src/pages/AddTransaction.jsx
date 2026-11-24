import { useState } from 'react';

import Sidebar from '../components/Sidebar'
import "../css/AddTransaction.css";


const AddTransaction = () => {

  return (
    <div className={`add-transaction`}>
        <Sidebar />

        <div className="add-transaction-main">
            <div className='add-transaction-header'>
                <h2>Add Transaction</h2>
                <div className='add-transaction-content'>

                </div>
            </div>
        </div>
    </div>
  )
}

export default AddTransaction