import {Component, useState} from "react";
import axios from 'axios';
import * as React from "react";

export class EnterLocComponent extends Component {

    constructor(props : any) {
        super(props);
    }

    state = {
        'nric':0,
        'location_id': 0,
        //only will be used to hold the outcome of the data
        'createdAlert' : ''
    }

    onUpdateLoc = (updatedInfo : any) => {
        const result = (
            <p style={{'fontSize' : 14}}> You have successfully check in to {updatedInfo.location_id}.<br/>
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
        const dto = {'nric' : this.state.nric, 'location_id': this.state.location_id};
        return dto;
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        //map data to DTO object for sending //
        const dto  = this.mapDTO();
        //map data to DTO object for sending //
        axios.post("http://localhost:5000/c_tracing",dto)
            .then(res=> {
                console.log(res);
                this.onUpdateLoc(res.data);
            })
            .catch(err => {
                console.log(err);
            });
         //const outcome = postIssueAlerts_API(this.state);
         //outcome.then(res => {
          //   console.log(res);
         //}).catch(err => {
          //  console.log(err);
         //});
        this.setState({nric: '', location_id: ''});
    }

    render() {
        const {nric, location_id} = this.state;
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>NRIC: </label>
                        <input type="text" name='nric' value={nric} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label>Location: </label>
                        <input type="number" name="location_id" value={location_id} onChange={this.changeHandler}/>
                    </div>
    
                    <button type="submit">Check-In</button>
                    <div>{this.state.createdAlert}</div>
                </form>
            </div>
        );
    }
}