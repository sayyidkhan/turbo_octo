import '../App.css';
import {IssueAlerts} from "../components/issuealerts/IssueAlertsComponent";
import {AlertsTable} from '../components/alertstable/IndivAlertsTableComponent';
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';
import {AlertsTableForBusinessComponent} from '../components/alertstable/AlertsTableForBusinessComponent';
import {Component} from "react";

export default class PublicAlerts extends Component {

    state = {
        renderStatus: 0,
    }

    setRenderStatus(status : any){
        this.setState({renderStatus: status});
    }

    render() {

        const userType = sessionStorage.getItem("userType");

        if(userType === "government"){
            return (
                <div className="dashboard-container-general">
                    <h1>Public Alerts</h1>
                    <div className="under-page-title-div">
                        <CurrentLoginUserComponent/>
                    </div>
                    <div className="dashboard-container">
            
                        <div className="dashboard-tableContainer-div">
                            <h2>Issue New Alert</h2>
                            <div>
                                <IssueAlerts setRenderStatus={(e) => this.setRenderStatus(e)}/>
                            </div>
                        </div>
    
                        <div className="dashboard-tableContainer-div">
                            <h2>Public Alerts</h2>
                            <div className="account-typical-content-div">
                            <AlertsTable renderStatus={this.state.renderStatus}/>
                            </div>
                        </div>
                    
                    </div>
                </div>
            );
        } else {
            return (
                <div className="dashboard-container-general">
                    <h1>Public Alerts</h1>
                    <div className="under-page-title-div">
                        <CurrentLoginUserComponent/>
                    </div>
                    <div className="dashboard-container">
                        <div className="dashboard-tableContainer-div">
                            <div className="account-typical-content-div">
                            <h2 style={{'color':'red'}}>Search Alerts</h2>
                            <AlertsTableForBusinessComponent />
                            </div>
                        </div>
                    
                    </div>
                </div>
            );
        }
    }
}