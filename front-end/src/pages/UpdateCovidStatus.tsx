import '../App.css';
import {UpdateCovidStatus} from "../components/updatecovidstatus/UpdateCovidStatusComponent";
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';
import {Component} from "react";

export default class CovidStatus extends Component {
    render() {
        return (
            <div className="dashboard-container-general">
                <h1>Update Covid Status</h1>
                <div className="under-page-title-div">
                    <CurrentLoginUserComponent/>
                </div>
                <div className="dashboard-container">
                    <div className="dashboard-tableContainer-div">
                        <h2>Update Citizen Covid-19 Status</h2>
                        <div>
                            <UpdateCovidStatus/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}