import {Component} from "react";
import CTPagination from "./CTPaginationComponent";
import * as React from "react";

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