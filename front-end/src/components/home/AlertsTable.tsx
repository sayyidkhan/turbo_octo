import {Component} from "react";
import {alertlisthome} from "./api/homealerts_api";
import {HomeAlertsTable} from "./HomeBasicTableComponent";
import axios from "axios";
import PaginationTableComponent from "./AlertsTablePagination";

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
                {/*<LocationTable myList={this.state.result}/>*/}
                <PaginationTableComponent myList={this.state.result}/>
            </div>
        );
    }
}