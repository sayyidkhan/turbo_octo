import {Component} from "react";
import axios from 'axios';
import * as React from "react";
import './UpdateCovidStatusComponent.css';

export class UpdateCovidStatus extends Component {

    constructor(props : any) {
        super(props);
    }

    state = {
        'p_nric': '',
        'covid_status': '',
        //only will be used to hold the outcome of the data
        'updateCovidStatus' : ''
    }

    onUpdateCovidStatusID = (updatedInfo : any) => {
        const result = (
            <p style={{'fontSize' : 14}}>Citizen Covid-19 status updated successfully.<br/>
            </p>
        );
        this.setState({'updateCovidStatus' : result});
        console.log(updatedInfo);
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    mapDTO = () => {
        //backend only accept this data shape
        const dto = {'covid_status': this.state.covid_status};
        //purge any existing data, if there is any
        this.setState({'updateCovidStatus' : ''});
        return dto;
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        //map data to DTO object for sending //
        const dto  = this.mapDTO();
        //map data to DTO object for sending //
        const p_nric = this.state.p_nric
        axios.patch(`http://localhost:5000/p_user/${p_nric}`, dto)
            .then(res=> {
                console.log(res);
                this.onUpdateCovidStatusID(res.data);
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
        this.setState({p_nric: '', covid_status: ''});
    }

    render() {
        const {p_nric , covid_status} = this.state;
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>Citizen NRIC: </label>
                        <input type="text" name="p_nric" value={p_nric} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label>Covid status: </label>
                        <input type="boolean" name="covid_status" value={covid_status} onChange={this.changeHandler}/>
                    </div>
                    <button type="submit">Update Covid-19 status</button>
                    <div>{this.state.updateCovidStatus}</div>
                </form>
            </div>
        );
    }
}