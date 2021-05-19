import { TextField } from "@material-ui/core";
import {Component} from "react";
import './Reports.css';

interface IProps {
    getReportRes(reportRes:any) : any;
}

interface IState {
}

export class ReportsFormComponent extends Component<IProps, IState> {

    state = {
        'reportType': 'monthlyCT',
        'date_from': new Date(),
        'date_to': new Date()
    }

    sendData(type:string, keys:any, data:any){
        this.props.getReportRes({type: type, keys: keys, data: data});
    }

    submitHandler = (e: any) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "date_from": this.state.date_from,
            "date_to": this.state.date_to
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        fetch("http://localhost:5000/c_tracing/report/monthly/", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);

            var keys: string[] = [];
            Object.keys(result).forEach(function(key) {
                keys.push(key);
            });

            var dateFormat = require('dateformat');
            const date_from_str = dateFormat(this.state.date_from, "yyyy-mm-dd"); 
            const date_to_str = dateFormat(this.state.date_to, "yyyy-mm-dd"); 
            this.sendData('monthCT'+date_from_str+date_to_str, keys, result);
        })
        .catch(error => console.log('error', error));

    }

    changeHandler = async (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    render() {

        const {reportType, date_from, date_to} = this.state;
        var dateFormat = require('dateformat');
        const date_from_str = dateFormat(date_from, "yyyy-mm-dd"); 
        const date_to_str = dateFormat(date_to, "yyyy-mm-dd"); 

        return (
            <div className="reports-form">
                <form onSubmit={this.submitHandler}>
                    <h3>Select the report to generate:</h3>
                    <div>
                        <label>Type of Report: </label>
                        <select name="reportType" value={reportType} onChange={this.changeHandler}>
                            <option value="monthlyCT">Monthly Contact Tracing Report</option>
                            <option value="weeklyCT">Weekly Contact Tracing Report</option>
                        </select>
                    </div>
                    <div>
                        <label>From Date: </label>
                        <TextField name="date_from" type="date" defaultValue={date_from_str} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <label>To Date: </label>
                        <TextField name="date_to" type="date" defaultValue={date_to_str} onChange={this.changeHandler} />
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