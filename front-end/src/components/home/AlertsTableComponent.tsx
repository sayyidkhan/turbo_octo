import {Component} from "react";
import {alertlisthome} from "./api/homealerts_api";
import axios from "axios";
import AlertsPaginationTableComponent from "./AlertsPaginationTableComponent";
import {HomeAlertsTable} from "./HomeBasicTableComponent";

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
        await alertlisthome().then(res => {
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
                <DisplayAlertNo status={this.state.status} totalNoofAlerts={this.state.totalNoofAlerts}/>
                {/*<HomeAlertsTable myList={this.state.result}/>*/}
                <AlertsPaginationTableComponent myList={this.state.result}/>
            </div>
        );
    }
}