import React from 'react';
import '../App.css';
import '../components/accounts/Accounts.css';
import {AccountsFormComponent} from "../components/accounts/AccountsFormComponent";
import {AccountsTableComponent} from "../components/accounts/AccountsTableComponent";
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';

export default function Accounts() {
    return (
        <div className="dashboard-container-general">
            <h1>Manages Accounts</h1>
            <div className="under-page-title-div">
                <CurrentLoginUserComponent/>
            </div>
            <div className="accounts-form-wrapper">
                <AccountsFormComponent />
            </div>

            <div className="accounts-table-wrapper">
                <AccountsTableComponent />
            </div>

        </div>
    );
}