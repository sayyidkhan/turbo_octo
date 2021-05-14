import {Component, useState} from "react";
import axios from 'axios';
import * as React from "react";
import {postTriggerAlerts_API} from "./api/triggeralerts_api";
import './TriggerAlertsComponent.css';

export class TriggerAlerts extends Component {

    constructor(props : any) {
        super(props);
    }

    state = {
        'date': '',
        'location_id': '',
        'description': '',
        'e_nric': '',
        //only will be used to hold the outcome of the data
        'triggerAlert' : ''
    }

    onUpdateTriggerAlertListID = (updatedInfo : any) => {
        const result = (
            <p style={{'fontSize' : 14}}>Issue alert trigger to government added successfully.<br/>
            </p>
        );
        this.setState({'triggerAlert' : result});
        console.log(updatedInfo);
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    mapDTO = () => {
        //backend only accept this data shape
        const dto = {'date': this.state.date, 'location_id': this.state.location_id, 'description': this.state.description, 'e_nric': this.state.e_nric};
        //purge any existing data, if there is any
        this.setState({'triggerAlert' : ''});
        return dto;
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        //map data to DTO object for sending //
        const dto  = this.mapDTO();
        //map data to DTO object for sending //
        axios.post("http://localhost:5000/healthcare_alert",dto)
            .then(res=> {
                console.log(res);
                this.onUpdateTriggerAlertListID(res.data);
            })
            .catch(err => {
                console.log(err);
                alert("Incomplete form or incorrect input! Please check and submit again!")
            });
         //const outcome = postIssueAlerts_API(this.state);
         //outcome.then(res => {
          //   console.log(res);
         //}).catch(err => {
          //  console.log(err);
         //});
        this.setState({date: '', location_id: '', description: '', e_nric: ''});
    }

    render() {
        const {date , location_id, description, e_nric} = this.state;
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>Date: </label>
                        <input type="text" name="date" value={date} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label>Location: </label>
                        <input type="number" name="location_id" value={location_id} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label>Description: </label>
                        <input type="text" name="description" value={description} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label>Triggered by: </label>
                        <input type="text" name="e_nric" value={e_nric} onChange={this.changeHandler}/>
                    </div>
                    <button type="submit">Trigger alert</button>
                    <div>{this.state.triggerAlert}</div>
                </form>
            </div>
        );
    }
}