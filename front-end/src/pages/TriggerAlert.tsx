import '../App.css';
import {TriggerAlerts} from "../components/triggeralerts/TriggerAlertsComponent";
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';

export default function Dashboard() {
    return (
        <div className="dashboard-container-general">
            <h1>Trigger alerts</h1>
            <div className="under-page-title-div">
                <CurrentLoginUserComponent/>
            </div>
            <div className="dashboard-container">
                <div className="dashboard-tableContainer-div">
                    <h2>Trigger alert to government</h2>
                    <div className="account-typical-content-div">
                        <TriggerAlerts />
                    </div>
                </div>
            </div>
        </div>
    );
}