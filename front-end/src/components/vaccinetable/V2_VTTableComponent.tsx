import {Component} from "react";
import VTPagination from "./VaccinePaginationComponent";
import * as React from "react";

interface SearchNricProps {
    list_result : any[];
}

export class V2VTTable extends Component<SearchNricProps> {

    render() {
        return(
            <div>
                {/*<HomeAlertsTable myList={this.state.result}/>*/}
                <VTPagination myList={this.props.list_result}/>
            </div>
        );
    }
}