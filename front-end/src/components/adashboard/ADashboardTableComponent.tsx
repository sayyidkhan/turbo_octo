import {Component} from "react";
import {alertlistadmin} from "./api/adashboard_api";
import axios from "axios";
import AdashboardPaginationTableComponent from "./AdashboardPaginationTableComponent";

function DisplayAlertNo(props: { status: number, totalNoofAlerts: number }) {
    return <div>
        <p style={{color: (props.status === 200) ? "green" : "black"}}>Total number of
            alerts: {props.totalNoofAlerts}</p>
    </div>;
}

export class AlertsTable extends Component {

    state = {
        loadingStatus : true,
        status : 0,
        totalNoofAlerts: 0,
        result : []
    }

    async componentDidMount() {
        await alertlistadmin().then(res => {
            const totalNoofAlerts : number = this.gettotalNoofAlerts(res.data);
            this.setState({result : res.data , totalNoofAlerts : totalNoofAlerts, status : res.status });
        }).catch(err => {
            console.log(err);
            this.setState({totalNoofAlerts : "backend not connected..." , status : err.status })
        });
    }

    gettotalNoofAlerts(myAlertList : any[]) : number {
        return myAlertList.length;
    }

    render() {
        return(
            <div>
                {/*<HomeAlertsTable myList={this.state.result}/>*/}
                <AdashboardPaginationTableComponent myList={this.state.result}/>
            </div>
        );
    }
}