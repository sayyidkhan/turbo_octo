import {Component} from "react";
import {alertlist} from "./api/alertstable_api";
import IndivAlertsPaginationTableComponent from "./IndivAlertsPaginationTableComponent";

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
        await alertlist().then(res => {
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
                <IndivAlertsPaginationTableComponent myList={this.state.result}/>
            </div>
        );
    }
}