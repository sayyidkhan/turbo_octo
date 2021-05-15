import '../App.css';
import {UpdateCovidStatus} from "../components/updatecovidstatus/UpdateCovidStatusComponent";
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';

export default function CovidStatus() {
    return (
        <div className="dashboard-container-general">
            <h1>Update Covid status</h1>
            <div className="under-page-title-div">
                <CurrentLoginUserComponent/>
            </div>
            <div className="dashboard-container">
                <div className="dashboard-tableContainer-div">
                    <h2>Citizen Covid-19 status update</h2>
                    <div className="account-typical-content-div">
                        <UpdateCovidStatus />
                    </div>
                </div>
            </div>
        </div>
    );
}