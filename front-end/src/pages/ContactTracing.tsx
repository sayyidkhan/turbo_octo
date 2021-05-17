import React, {Component} from 'react';
import '../App.css';
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';
import CTMainComponent from "../components/ctracingtable/CTMainComponent";

export default class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard-container-general">
                <h1>Contact tracing</h1>
                <div className="under-page-title-div">
                    <CurrentLoginUserComponent/>
                </div>
                <CTMainComponent/>
            </div>
        )
    }
}