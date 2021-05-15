import {Component} from "react";
import './Reports.css';
/*import history from '../../history';*/


export class ReportsFormComponent extends Component {


    submitHandler = (e: any) => {
        e.preventDefault();
        
    }

    render() {
        return (
            <div className="reports-form">
                <form onSubmit={this.submitHandler}>
                    <h3>Select the report to generate:</h3>
                    <div>
                        <label>Type of Report: </label>
                        <select>
                            <option selected value="infection">Covid-19 Infection Report</option>
                            <option value="activeDischarged">Active and Discharged Cases Report</option>
                        </select>
                    </div>
                    <div>
                        <label>Report Periodicity: </label>
                        <select>
                            <option value="daily">Daily</option>
                            <option selected value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <div>
                        <label></label>
                        <button type="submit">Generate</button>
                    </div>
                </form>
            </div>
        );
    }

}