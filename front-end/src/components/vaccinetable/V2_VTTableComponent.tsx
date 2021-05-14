import {Component} from "react";
import {vaccinelist} from "./api/vaccinetable_api";
import axios from "axios";
import VTPagination from "./VaccinePaginationComponent";
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

export class V2_VTTable extends Component<SearchNricProps> {

    render() {
        return(
            <div>
                {/*<HomeAlertsTable myList={this.state.result}/>*/}
                <VTPagination myList={this.props.list_result}/>
            </div>
        );
    }
}