import { useState } from 'react';

import Sidebar from '../components/Sidebar'
import "../css/Settings.css";


const Settings = () => {
  return (
    <div className={`settings`}>
        <Sidebar />

        <div className="settings-main">
            <div className='settings-header'>
                <h2>Settings</h2>
                <div className='settings-content'>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Settings