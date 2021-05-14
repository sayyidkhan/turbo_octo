import React from 'react';
import '../App.css';
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';
import VTMainComponent from "../components/vaccinetable/VTMainComponent";

export default function Dashboard() {
    return (
        <div className="dashboard-container-general">
            <h1>Vaccination records</h1>
            <div className="under-page-title-div">
                <CurrentLoginUserComponent/>
            </div>
            <VTMainComponent />
        </div>
    )
}