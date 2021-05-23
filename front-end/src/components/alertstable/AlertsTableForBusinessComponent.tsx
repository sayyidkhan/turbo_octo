import {Component} from "react";
import AlertsPaginationTableComponent from "./AlertsPaginationTableComponent";
import SearchAlertComponent from "./SearchAlertComponent";
import './alertstable.css';

function DisplayAlertNo(props: { status: number, totalNoofAlerts: number }) {
    return <div>
        <p style={{color: (props.status === 200) ? "green" : "black"}}>Total number of
            alerts: {props.totalNoofAlerts}</p>
    </div>;
}

export class AlertsTableForBusinessComponent extends Component {

    state = {
        status : 0,
        totalNoofAlerts: 0,
        result : []
    }

    setResult = (result: []) => {
        this.setState({result : result, totalNoofAlerts: result.length});
    }

    showTable() {

        if (this.state.result.length !== 0) {
                return (
                    <div>
                        <DisplayAlertNo status={this.state.status} totalNoofAlerts={this.state.totalNoofAlerts}/>
                        <AlertsPaginationTableComponent myList={this.state.result}/>
                    </div>
                );
        }else{
            return(
                <div></div>
            );
        }
    }

    render() {
        return(
            <div className="business-alert-div">
                <SearchAlertComponent callback_function={this.setResult}/>
                {this.showTable()}
            </div>
        );
    }
}