import {Component} from "react";
import axios from 'axios';
import * as React from "react";
import './IssueAlertsComponent.css';

export class IssueAlerts extends Component {

    state = {
        'alertTitle': '',
        'alertDetail': '',
        'alertDate': '',
        'active': '',
        'location_id': 0,
        //only will be used to hold the outcome of the data
        'createdAlert' : ''
    }

    /*
    const result = (
        <p style={{'fontSize' : 14}}>Issue ID {updatedInfo.alertListId} added successfully.<br/>
        Please refresh page to see updated table.
        </p>
    );*/

    onUpdateAlertListID = (updatedInfo : any) => {
        const result = (
            <p style={{'fontSize' : 14}}>Issue ID {updatedInfo.alertListId} added successfully.<br/>
            Please refresh page to see updated table.
            </p>
        );
        this.setState({'createdAlert' : result});
        console.log(updatedInfo);
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    mapDTO = () => {
        //backend only accept this data shape
        const dto = {'alertTitle': this.state.alertTitle, 'alertDetail': this.state.alertDetail, 'alertDate': this.state.alertDate, 'active': this.state.active, 'location_id': this.state.location_id};
        //purge any existing data, if there is any
        this.setState({'createdAlert' : ''});
        return dto;
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        //map data to DTO object for sending //
        const dto  = this.mapDTO();
        //map data to DTO object for sending //
        axios.post("http://localhost:5000/alertlist",dto)
            .then(res=> {
                console.log(res);
                this.onUpdateAlertListID(res.data);
            })
            .catch(err => {
                console.log(err);
                alert("Incomplete form! Please complete the form and submit again!")
            });
         //const outcome = postIssueAlerts_API(this.state);
         //outcome.then(res => {
          //   console.log(res);
         //}).catch(err => {
          //  console.log(err);
         //});
        this.setState({alertTitle: '', alertDetail: '', alertDate: '', active: '', location_id: ''});
    }

    render() {
        const {alertTitle , alertDetail, alertDate, active, location_id} = this.state;
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>Date: </label>
                        <input type="text" name="alertDate" value={alertDate} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label>Location: </label>
                        <input type="number" name="location_id" value={location_id} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label>Details: </label>
                        <input type="text" name="alertDetail" value={alertDetail} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label>Alert level: </label>
                        <input type="text" name="alertTitle" value={alertTitle} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label>Active: </label>
                        <input type="text" name="active" value={active} onChange={this.changeHandler}/>
                    </div>
                    <button type="submit">Issue alert</button>
                    <div>{this.state.createdAlert}</div>
                </form>
            </div>
        );
    }
}