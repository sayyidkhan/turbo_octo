import React from 'react';
import '../App.css';
import {IssueAlerts} from "../components/issuealerts/IssueAlertsComponent";
import {AlertsTable} from '../components/alertstable/AlertsTableComponent';
import {Box} from "@material-ui/core"
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';

export default function Dashboard() {
    return (
        <div className="dashboard-container-general">
            <h1>Public alerts</h1>
            <div className="under-page-title-div">
                <CurrentLoginUserComponent/>
            </div>
            <div className="dashboard-container">
    
                <div className="dashboard-tableContainer-div">
                    <h2>Issue new alert</h2>
                    <div className="account-typical-content-div">
                      <IssueAlerts />
                    </div>
                </div>

                <div className="dashboard-tableContainer-div">
                    <h2>Public alerts issued</h2>
                    <div className="account-typical-content-div">
                      <AlertsTable />
                    </div>
                </div>
            </div>
        </div>
    )
}