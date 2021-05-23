import {Component} from "react";
import axios from 'axios';
import './TriggerAlertsComponent.css';
import { TextField } from "@material-ui/core";

export class TriggerAlerts extends Component {

    state = {
        'date': new Date(),
        'location_id': '',
        'description': '',
        'e_nric': '',
        'actionMessage' : ''
    }

    onUpdateactionMessageListID = (updatedInfo : any) => {
        const result = (
            <p style={{'color' : 'green'}}>
                Issue alert trigger to government added successfully.<br/>
            </p>
        );
        this.setState({'actionMessage' : result});
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    mapDTO = () => {
        const dto = {'date': this.state.date, 'location_id': this.state.location_id, 'description': this.state.description, 'e_nric': this.state.e_nric};
        this.setState({'actionMessage' : ''});
        return dto;
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        const dto  = this.mapDTO();

        axios.post("http://localhost:5000/healthcare_alert", dto)
            .then(res=> {
                console.log(res);
                this.onUpdateactionMessageListID(res.data);
            })
            .catch(err => {
                console.log(err);
                const result = (
                    <p style={{'color' : 'red'}}>
                        Invalid Location ID or Trigger NRIC.<br/>
                    </p>
                );
                this.setState({'actionMessage' : result});
            });

        this.setState({date: new Date(), location_id: '', description: '', e_nric: ''});
    }

    render() {

        const {date , location_id, description, e_nric} = this.state;
        var dateFormat = require('dateformat');
        const date_str = dateFormat(date, "yyyy-mm-dd");

        return (
            <div className="trigger-alert-div">
                <form onSubmit={this.submitHandler}>
                    <div style={{'paddingBottom':'10px'}}>
                        <label>Date: </label>
                        <TextField name="date" type="date" value={date_str} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label>Location ID: </label>
                        <input type="number" name="location_id" value={location_id} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label style={{'height':'60px', 'marginTop':'-30px'}}>Description: </label>
                        <textarea name="description" value={description} onChange={this.changeHandler}></textarea>
                    </div>
                    <div>
                        <label>Triggered By: </label>
                        <input type="text" name="e_nric" value={e_nric} onChange={this.changeHandler}/>
                    </div>
                    <label></label>
                    <button type="submit">Trigger Alert</button>
                </form>
                <div style={{'paddingLeft':'20px'}}>{this.state.actionMessage}</div>
            </div>
        );
    }
}