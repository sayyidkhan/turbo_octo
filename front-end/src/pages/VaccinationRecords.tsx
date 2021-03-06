import {Component} from 'react';
import '../App.css';
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';
import VTMainComponent from "../components/vaccinetable/VTMainComponent";
import {IssueVaccine} from "../components/issuevaccinecert/IssueVaccineComponent";


export default class Dashboard extends Component {
    render() {

        const userType = sessionStorage.getItem("userType");

        if (userType === "G") {
            return (
                <div className="dashboard-container-general">
                    <h1>Vaccination</h1>
                    <div className="under-page-title-div">
                        <CurrentLoginUserComponent/>
                    </div>
                    <VTMainComponent/>
                </div>
            );

        } else if (userType === "H") {
            return (
                <div className="dashboard-container-general">
                    <h1>Vaccination</h1>
                    <div className="under-page-title-div">
                        <CurrentLoginUserComponent/>
                    </div>
                    <IssueVaccine/>
                    <VTMainComponent/>
                </div>
            );

        } else {
            return (
                <div></div>
            );
        }
    }
}