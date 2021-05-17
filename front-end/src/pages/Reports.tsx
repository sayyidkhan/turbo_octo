import React, {Component} from 'react';
import '../App.css';
import '../components/reports/Reports.css';
import {ReportsFormComponent} from "../components/reports/ReportsFormComponent";
import {ReportsResultComponent} from "../components/reports/ReportsResultComponent";
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';

export default class Reports extends Component {
    render() {
        return (
            <div className="dashboard-container-general">
                <h1>Reports</h1>
                <div className="under-page-title-div">
                    <CurrentLoginUserComponent/>
                </div>
                <div className="reports-form-wrapper">
                    <ReportsFormComponent/>
                </div>

                <div className="reports-result-wrapper">
                    <ReportsResultComponent/>
                </div>

            </div>
        )
    }
}