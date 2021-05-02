import React from 'react';
import '../components/accounts/Accounts.css';
import {AccountsFormComponent} from "../components/accounts/AccountsFormComponent";
import {AccountsTableComponent} from "../components/accounts/AccountsTableComponent";

export default function Accounts() {
    return (
        <div className="accounts-container">
            <h1>Manages Accounts</h1>
            
            <div className="accounts-form-wrapper">
                <AccountsFormComponent />
            </div>

            <div className="accounts-table-wrapper">
                <AccountsTableComponent />
            </div>

        </div>
    );
}