import { TextField } from "@material-ui/core";
import {Component} from "react";
import './Reports.css';
import {postMonthlyReport_API, postWeeklyReport_API} from "../issuevaccinecert/api/issuevaccine_api";

interface IProps {
    getReportRes(reportRes:any) : any;
}

interface IState {
}

enum FrequencyType {
    month = "month",
    week = "week"
}

enum ReportType {
    CT_MONTH = "monthlyCT",
    CT_WEEK = "weeklyCT",
    //add vaccination report type below here
}

function MonthlySearchComponent(props: { date_from: any, onChange: (e: any) => Promise<void>, date_to: any }) {
    return <>
        <div>
            <label>From Date: </label>
            <TextField name="date_from" type="date" defaultValue={props.date_from} onChange={props.onChange}/>
        </div>
        <div>
            <label>To Date: </label>
            <TextField name="date_to" type="date" defaultValue={props.date_to} onChange={props.onChange}/>
        </div>
    </>;
}

function WeekComponent(props: { value: number, onChange: (e: any) => Promise<void>, value1: number }) {
    return <>
        <div>
            <label>Month: </label>
            <select name="month" value={props.value} onChange={props.onChange}>
                <option value={1}>Jan</option>
                <option value={2}>Feb</option>
                <option value={3}>Mar</option>
                <option value={4}>Apr</option>
                <option value={5}>May</option>
                <option value={6}>Jun</option>
                <option value={7}>Jul</option>
                <option value={8}>Aug</option>
                <option value={9}>Sep</option>
                <option value={10}>Oct</option>
                <option value={11}>Nov</option>
                <option value={12}>Dec</option>
            </select>
        </div>
        <div>
            <label>Year: </label>
            <select name="year" value={props.value1} onChange={props.onChange}>
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
            </select>
        </div>
    </>;
}

export class ReportsFormComponent extends Component<IProps, IState> {

    state = {
        frequencyType : FrequencyType.month,
        reportType: ReportType.CT_MONTH,
        //variables for monthly record
        date_from: new Date(),
        date_to: new Date(),
        //variables for weekly record
        year : 2021,
        month : 1,
    }

    sendData(type:string, keys:any, data:any){
        this.props.getReportRes({type: type, keys: keys, data: data});
    }

    submitHandler = (e: any) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        //logic for the month
        if(this.state.frequencyType === FrequencyType.month) {
            const dto = {
                "date_from": this.state.date_from,
                "date_to": this.state.date_to
            };

            postMonthlyReport_API(dto)
                .then(res => {
                    const result =  res.data;

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
        //logic for the weekly report
        else if(this.state.frequencyType === FrequencyType.week) {
            const dto = {
                month: Number(this.state.month),
                year : Number(this.state.year),
            };


            postWeeklyReport_API(dto)
                .then(res => {
                    const result = res.data;
                    /*********** extract the data here **********/
                    console.log(result);
                    /*********** extract the data here **********/

                    const keys: string[] = [];
                    Object.keys(result).forEach(function(key) {
                        keys.push(key);
                });

                    /*********** need to add the logic for filter on a weekly basis **********/
                    //this.sendData('monthCT'+date_from_str+date_to_str, keys, result);
                    /*********** need to add the logic for filter on a weekly basis **********/
                })
                .catch(error => console.log('error', error));
        }

    }

    changeHandler = async (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    queryComponent() {
        const {date_from, date_to} = this.state;
        var dateFormat = require('dateformat');
        const date_from_str = dateFormat(date_from, "yyyy-mm-dd");
        const date_to_str = dateFormat(date_to, "yyyy-mm-dd");

        switch (this.state.frequencyType) {
            case FrequencyType.month:
                return (
                    <MonthlySearchComponent
                        date_from={date_from_str}
                        date_to={date_to_str}
                        onChange={this.changeHandler}
                    />
                );
            case FrequencyType.week:
                return (
                    <WeekComponent
                        value={this.state.month}
                        value1={this.state.year}
                        onChange={this.changeHandler}
                    />
                );
            default:
                return <div></div>;
        }

    }

    render() {
        const {frequencyType, reportType} = this.state;

        return (
            <div className="reports-form">
                <form onSubmit={this.submitHandler}>
                    <h3>Select the report to generate:</h3>
                    <div>
                        <label>Type of Report: </label>
                        <select name="reportType" value={reportType} onChange={this.changeHandler}>
                            <option value={ReportType.CT_MONTH}>Contact Tracing Report</option>
                            <option value={ReportType.CT_WEEK}>Contact Tracing Report</option>
                        </select>
                    </div>
                    <div>
                        <label>Frequency: </label>
                        <select name="frequencyType" value={frequencyType} onChange={this.changeHandler}>
                            <option value={FrequencyType.month}>Monthly</option>
                            <option value={FrequencyType.week}>Weekly</option>
                        </select>
                    </div>
                    {this.queryComponent()}
                    <div>
                        <label></label>
                        <button type="submit">Generate</button>
                    </div>
                </form>
            </div>
        );
    }

}