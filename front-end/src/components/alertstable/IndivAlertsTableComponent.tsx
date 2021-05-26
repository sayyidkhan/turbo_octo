import {Component} from "react";
import {alertlistfull} from "./api/alertstable_api";
import IndivAlertsPaginationTableComponent from "./IndivAlertsPaginationTableComponent";

function DisplayAlertNo(props: { status: number, totalNoofAlerts: number }) {
    return <div>
        <p style={{color: (props.status === 200) ? "green" : "black"}}>Total number of
            alerts: {props.totalNoofAlerts}</p>
    </div>;
}

interface IProps {
    renderStatus : any;
}

interface IState {
}

export class AlertsTable extends Component<IProps, IState> {

    state = {
        loadingStatus : 0,
        status : 0,
        totalNoofAlerts: 0,
        result : []
    }

    async componentDidUpdate() {
        if(this.state.loadingStatus !== this.props.renderStatus) {
            await this.componentDidMount();
        }
    }

    async componentDidMount() {
        await alertlistfull().then(res => {
            const totalNoofAlerts : number = this.gettotalNoofAlerts(res.data);
            this.setState({result : res.data , totalNoofAlerts : totalNoofAlerts, status : res.status, loadingStatus: this.props.renderStatus});
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
                <IndivAlertsPaginationTableComponent myList={this.state.result} renderStatus={this.state.loadingStatus}/>
            </div>
        );
    }
}