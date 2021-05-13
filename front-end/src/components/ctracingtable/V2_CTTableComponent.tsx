import {Component} from "react";
import {ctracinglist} from "./api/cttable_api";
import axios from "axios";
import CTPagination from "./CTPaginationComponent";
import * as React from "react";

function DisplayAlertNo(props: { status: number, totalNoofAlerts: number }) {
    return <div>
        <p style={{color: (props.status === 200) ? "green" : "black"}}>Total number of
            alerts: {props.totalNoofAlerts}</p>
    </div>;
}

interface SearchNricProps {
    list_result : any[];
}

export class V2_CTTable extends Component<SearchNricProps> {

    render() {
        return(
            <div>
                {/*<HomeAlertsTable myList={this.state.result}/>*/}
                <CTPagination myList={this.props.list_result}/>
            </div>
        );
    }
}