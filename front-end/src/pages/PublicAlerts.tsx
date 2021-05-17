import '../App.css';
import {IssueAlerts} from "../components/issuealerts/IssueAlertsComponent";
import {AlertsTable} from '../components/alertstable/IndivAlertsTableComponent';
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';
import {Component} from "react";

export function RenderSubDashboardComponent() {
    
    const userType = sessionStorage.getItem("userType");

    if(userType === "government"){
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
                        <h2>Public alerts</h2>
                        <div className="account-typical-content-div">
                        <AlertsTable />
                        </div>
                    </div>
                
                </div>
            </div>
        );
    } else {
        return (
            <div className="dashboard-container-general">
                <h1>Public alerts</h1>
                <div className="under-page-title-div">
                    <CurrentLoginUserComponent/>
                </div>
                <div className="dashboard-container">

                    <div className="dashboard-tableContainer-div">
                        <h2>Public alerts</h2>
                        <div className="account-typical-content-div">
                        <AlertsTable />
                        </div>
                    </div>
                
                </div>
            </div>
        );
    }
}

export default class Dashboard extends Component {

    render() {
        return (
            <RenderSubDashboardComponent />
        );
    }
}