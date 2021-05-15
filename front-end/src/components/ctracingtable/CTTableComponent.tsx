import {Component} from "react";
import {ctracinglist} from "./api/cttable_api";
import CTPagination from "./CTPaginationComponent";

export class CTTable extends Component {

    state = {
        loadingStatus : true,
        status : 0,
        totalNoofAlerts: 0,
        result : []
    }

    async componentDidMount() {
        await ctracinglist().then(res => {
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
                <CTPagination myList={this.state.result}/>
            </div>
        );
    }
}