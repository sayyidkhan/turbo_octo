import '../App.css';
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';
import {AdvisoryFromHealthcareTable} from '../components/dashboard/AdvisoryFromHealthcareTable';
import {RecentCheckedinTable} from '../components/dashboard/RecentCheckedinTable';
import {RecentVaccinatedTable} from '../components/dashboard/RecentVaccinatedTable';
import {RecentAlertsTable} from '../components/dashboard/RecentAlertsTable';
import {Covid19TipsComponent} from '../components/dashboard/Covid19TipsComponent';
import {Component} from "react";


export default class Dashboard extends Component {
    render() {

        const userType = sessionStorage.getItem("userType");

        if (userType === "government") {
            return (
                <div className="dashboard-container-general">
                    <h1>Dashboard</h1>
                    <div className="under-page-title-div">
                        <CurrentLoginUserComponent/>
                    </div>
                    <div className="dashboard-container">
                        <AdvisoryFromHealthcareTable/>
                        <RecentCheckedinTable/>
                        <RecentVaccinatedTable/>
                        <RecentAlertsTable/>
                    </div>
                </div>
            );

        } else if (userType === "healthcare") {
            return (
                <div className="dashboard-container-general">
                    <h1>Dashboard</h1>
                    <div className="under-page-title-div">
                        <CurrentLoginUserComponent/>
                    </div>
                    <div className="dashboard-container">
                        <RecentCheckedinTable/>
                        <RecentVaccinatedTable/>
                        <RecentAlertsTable/>
                    </div>
                </div>
            );

        } else if (userType === "business") {
            return (
                <div className="dashboard-container-general">
                    <h1>Dashboard</h1>
                    <div className="under-page-title-div">
                        <CurrentLoginUserComponent/>
                    </div>
                    <div className="dashboard-container">
                        <Covid19TipsComponent/>
                        <RecentAlertsTable/>
                    </div>
                </div>
            );

        } else {
            return (
                <div></div>
            );
        }

    }
}