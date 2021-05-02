import React from 'react';
import '../components/reports/Reports.css';
import {ReportsFormComponent} from "../components/reports/ReportsFormComponent";
import {ReportsResultComponent} from "../components/reports/ReportsResultComponent";

export default function Reports() {
    return (
        <div className="reports-container">
            <h1>Reports</h1>
            
            <div className="reports-form-wrapper">
                <ReportsFormComponent />
            </div>

            <div className="reports-result-wrapper">
                <ReportsResultComponent />
            </div>

        </div>
    )
}