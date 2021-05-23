import '../App.css';
import {TriggerAlerts} from "../components/triggeralerts/TriggerAlertsComponent";
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';
import {Component} from "react";

export default class TriggerAlert extends Component {
    render() {
        return (
            <div className="dashboard-container-general">
                <h1>Trigger Alerts</h1>
                <div className="under-page-title-div">
                    <CurrentLoginUserComponent/>
                </div>
                <div className="dashboard-container">
                    <div className="dashboard-tableContainer-div">
                        <h2>Trigger Alert to Government</h2>
                        <div>
                            <TriggerAlerts/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}