import '../App.css';
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';
import {AdvisoryFromHealthcareTable} from '../components/dashboard/AdvisoryFromHealthcareTable';
import {RecentCheckedinTable} from '../components/dashboard/RecentCheckedinTable';
import {RecentVaccinatedTable} from '../components/dashboard/RecentVaccinatedTable';
import {RecentAlertsTable} from '../components/dashboard/RecentAlertsTable';
import {Covid19TipsComponent} from '../components/dashboard/Covid19TipsComponent';


export default function Dashboard() {

    const userType = sessionStorage.getItem("userType");

    //use switch when there is more than 2 options, if else will validate on each if else
    //while switch case will directly go to the case and ignore the other options (faster ui loading)
    switch (userType) {
        case "government":
            return (
                <div className="dashboard-container-general">
                    <h1>Dashboard</h1>
                    <div className="under-page-title-div">
                        <CurrentLoginUserComponent />
                    </div>
                    <div className="dashboard-container">
                        <AdvisoryFromHealthcareTable />
                        <RecentCheckedinTable />
                        <RecentVaccinatedTable />
                        <RecentAlertsTable />
                    </div>
                </div>
            );
        case "healthcare":
            return (
                <div className="dashboard-container-general">
                    <h1>Dashboard</h1>
                    <div className="under-page-title-div">
                        <CurrentLoginUserComponent />
                    </div>
                    <div className="dashboard-container">
                        <RecentCheckedinTable />
                        <RecentVaccinatedTable />
                        <RecentAlertsTable />
                    </div>
                </div>
            );
        case "business":
            return (
                <div className="dashboard-container-general">
                    <h1>Dashboard</h1>
                    <div className="under-page-title-div">
                        <CurrentLoginUserComponent />
                    </div>
                    <div className="dashboard-container">
                        <Covid19TipsComponent />
                        <RecentAlertsTable />
                    </div>
                </div>
            );
        default:
            <div></div>;
    }

}