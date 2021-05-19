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

    gettotalNoofAlerts(myAlertList : any[]) : number {
        return myAlertList.length;
    }

    render() {
        return(
            <div>
                <CTPagination myList={this.state.result}/>
            </div>
        );
    }
}