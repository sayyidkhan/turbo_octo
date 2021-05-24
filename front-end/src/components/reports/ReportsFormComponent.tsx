import { TextField } from "@material-ui/core";
import {Component} from "react";
import './Reports.css';
import {postMonthlyCTReport_API, postWeeklyCTReport_API, postMonthlyVaccReport_API, postWeeklyVaccReport_API} from "./api/reports_api";

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
    CT = "CT",
    Vacc = "Vacc",
}

function MonthlySearchComponent(props: { date_from: any, onChange: (e: any) => Promise<void>, date_to: any }) {
    return <>
        <div>
            <label>From Date: </label>
            <TextField name="date_from" type="date" value={props.date_from} onChange={props.onChange}/>
        </div>
        <div>
            <label>To Date: </label>
            <TextField name="date_to" type="date" value={props.date_to} onChange={props.onChange}/>
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
        actionMessage: '',
        frequencyType: FrequencyType.month,
        reportType: ReportType.CT,
        //variables for monthly record
        date_from: new Date(),
        date_to: this.getDatePlusMonth(new Date(), 1),
        //variables for weekly record
        year: 2021,
        month: 1,
    }

    getDatePlusMonth(date : Date, month : number){
        date.setMonth( date.getMonth() + month );
        return date;
    }

    sendData(type:string, keys:any, data:any){
        this.props.getReportRes({type: type, keys: keys, data: data});
    }

    checkValidation(){

        if(this.state.frequencyType === FrequencyType.month){
            var dateFormat = require('dateformat');
            const date_from_str = dateFormat(this.state.date_from, "mm/dd/yyyy");
            const date_to_str = dateFormat(this.state.date_to, "mm/dd/yyyy");

            const currentYear = new Date().getFullYear().toString();
            const dateFrom : number = new Date(date_from_str).getTime();
            const dateTo : number = new Date(date_to_str).getTime();
            const diffDays = Math.floor((dateTo - dateFrom) / (1000 * 60 * 60 * 24));

            console.log(this.state.date_from, " ", this.state.date_to);

            if(dateFrom > dateTo) {
                this.setState({actionMessage: "From Date cannot greater than To Date."});
                return false;
            }
            else if(dateFrom === dateTo) {
                this.setState({actionMessage: "From Date and To Date cannot be the same day."});
                return false;
            }
            else if(diffDays < 31) {
                this.setState({actionMessage: "The report duration cannot less than 1 month."});
                return false;
            }
            else if(diffDays > 365) {
                this.setState({actionMessage: "The report duration cannot exceed 1 year range."});
                return false;

            }else if(date_from_str.slice(-4) !== date_to_str.slice(-4)){
                this.setState({actionMessage: "The report can only be generated within a year."});
                return false;

            }
            else {
                this.setState({actionMessage: ''});
                return true;
            }
        }else {
            this.setState({actionMessage: ''});
            return true;
        }
    }

    submitHandler = async (e: any) => {
        e.preventDefault();

        if(!this.checkValidation()){
            return;
        }

        //logic for the month
        if(this.state.frequencyType === FrequencyType.month) {

            const dto = {
                "date_from": this.state.date_from,
                "date_to": this.state.date_to
            };

            if(this.state.reportType === ReportType.CT){
                await postMonthlyCTReport_API(dto)
                    .then((res: { data: any; }) => {
                        const result =  res.data;

                        var keys: string[] = [];
                        Object.keys(result).forEach(function(key) {
                            keys.push(key);
                        });

                        if(keys.length === 0){
                            this.setState({actionMessage: 'No result found.'});
                        }

                        var dateFormat = require('dateformat');
                        const date_from_str = dateFormat(this.state.date_from, "yyyy-mm-dd");
                        const date_to_str = dateFormat(this.state.date_to, "yyyy-mm-dd");
                        this.sendData('MCT'+date_from_str+date_to_str, keys, result);
                    })
                    .catch((error: any) => console.log('error', error));

            }else if(this.state.reportType === ReportType.Vacc){
                await postMonthlyVaccReport_API(dto)
                    .then((res: { data: any; }) => {
                        const result =  res.data;
                        var keys: string[] = [];
                        Object.keys(result).forEach(function(key) {
                            keys.push(key);
                        });

                        if(keys.length === 0){
                            this.setState({actionMessage: 'No result found.'});
                        }

                        var dateFormat = require('dateformat');
                        const date_from_str = dateFormat(this.state.date_from, "yyyy-mm-dd");
                        const date_to_str = dateFormat(this.state.date_to, "yyyy-mm-dd");
                        this.sendData('MVA'+date_from_str+date_to_str, keys, result);
                    })
                    .catch((error: any) => console.log('error', error));
            }
        }
        //logic for the weekly report
        else if(this.state.frequencyType === FrequencyType.week) {

            const dto = {
                month: Number(this.state.month),
                year : Number(this.state.year),
            };

            if(this.state.reportType === ReportType.CT){
                await postWeeklyCTReport_API(dto)
                    .then((res: { data: any }) => {
                        const result = res.data;
                        console.log(result);

                        const keys: string[] = [];
                        Object.keys(result).forEach(function(key) {
                            keys.push(key);
                        });

                        if(keys.length === 0){
                            this.setState({actionMessage: 'No result found.'});
                        }

                        const yearStr = this.state.year.toString();
                        const month = this.state.month;
                        let monthStr = month.toString();
                        if(month < 10){
                            monthStr = "0" + monthStr;
                        }
                        
                        this.sendData('WCT'+yearStr+monthStr, keys, result);
                    })
                    .catch((error: any) => console.log('error', error));

            }else if(this.state.reportType === ReportType.Vacc){
                 await postWeeklyVaccReport_API(dto)
                    .then((res: { data: any }) => {
                        const result = res.data;
                        console.log(result);

                        const keys: string[] = [];
                        Object.keys(result).forEach(function(key) {
                            keys.push(key);
                        });

                        if(keys.length === 0){
                            this.setState({actionMessage: 'No result found.'});
                        }

                        const yearStr = this.state.year.toString();
                        const month = this.state.month;
                        let monthStr = month.toString();
                        if(month < 10){
                            monthStr = "0" + monthStr;
                        }

                        this.sendData('WVA'+yearStr+monthStr, keys, result);
                    })
                    .catch((error: any) => console.log('error', error));
            }
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
                    <h4>Select the report to generate:</h4>
                    <div>
                        <label>Type of Report: </label>
                        <select name="reportType" value={reportType} onChange={this.changeHandler}>
                            <option value={ReportType.CT}>Contact Tracing Report</option>
                            <option value={ReportType.Vacc}>Vaccination Report</option>
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
                <div><p style={{'color': 'red'}}>{this.state.actionMessage}</p></div>
            </div>
        );
    }

}