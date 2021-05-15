import {Component} from "react";
import axios from 'axios';
import * as React from "react";
import './IssueVaccineComponent.css';

export class IssueVaccine extends Component {

    constructor(props : any) {
        super(props);
    }

    state = {
        'p_nric': '',
        'v_date': '',
        'e_nric': '',
        //only will be used to hold the outcome of the data
        'createdVaccine' : ''
    }

    /*
    const result = (
        <p style={{'fontSize' : 14}}>Issue ID {updatedInfo.alertListId} added successfully.<br/>
        Please refresh page to see updated table.
        </p>
    );*/

    onUpdateVaccineID = (updatedInfo : any) => {
        const result = (
            <p style={{'fontSize' : 14}}>Issue ID {updatedInfo.vaccineListID} added successfully.<br/>
            Please refresh page to see updated table.
            </p>
        );
        this.setState({'createdVaccine' : result});
        console.log(updatedInfo);
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    mapDTO = () => {
        //backend only accept this data shape
        const dto = {'p_nric': this.state.p_nric, 'v_date': this.state.v_date, 'e_nric': this.state.e_nric};
        //purge any existing data, if there is any
        this.setState({'createdVaccine' : ''});
        return dto;
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        //map data to DTO object for sending //
        const dto  = this.mapDTO();
        //map data to DTO object for sending //
        axios.post("http://localhost:5000/vaccines",dto)
            .then(res=> {
                console.log(res);
                this.onUpdateVaccineID(res.data);
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
        this.setState({p_nric: '', v_date: '', e_nric: ''});
    }

    render() {
        const {p_nric, v_date, e_nric} = this.state;
        return (
            <div className="dashboard-tableContainer-div">
                <div className="vaccineissue-typical-content-div">
                    <h2>Issue vaccination certificate</h2>
                    <form onSubmit={this.submitHandler}>
                        <div>
                            <label>Citizen NRIC: </label>
                            <input type="text" name="p_nric" value={p_nric} onChange={this.changeHandler}/>
                        </div>
                        <div>
                            <label>Vaccination date: </label>
                            <input type="text" name="v_date" value={v_date} onChange={this.changeHandler}/>
                        </div>
                        <div>
                            <label>Issued by: </label>
                            <input type="text" name="e_nric" value={e_nric} onChange={this.changeHandler}/>
                        </div>
                        <button type="submit">Issue vaccination certificate</button>
                        <div>{this.state.createdVaccine}</div>
                    </form>
                </div>
            </div>
        );
    }
}