import {Component} from "react";
import axios from 'axios';
import { TextField } from "@material-ui/core";
import './IssueVaccineComponent.css';

export class IssueVaccine extends Component {

    state = {
        'p_nric': '',
        'v_date': this.getDatePlus8hours(new Date()),
        'e_nric': '',
        'actionMessage' : ''
    }

    getDatePlus8hours(date : Date){
        date.setHours( date.getHours() + 8 );
        return date;
    }

    onUpdateVaccineID = (updatedInfo : any) => {
        const result = (
            <p style={{'color' : 'green'}}>
                New vaccination certificate added successfully.<br/>
            </p>
        );
        this.setState({'actionMessage' : result});
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    mapDTO = () => {
        const dto = {
            'p_nric': this.state.p_nric, 
            'v_date': this.state.v_date, 
            'e_nric': this.state.e_nric
        };
        this.setState({'actionMessage' : ''});
        return dto;
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        const dto  = this.mapDTO();

        axios.post("http://localhost:5000/vaccines",dto)
            .then(res=> {
                console.log(res);
                this.onUpdateVaccineID(res.data);
            })
            .catch(err => {
                console.log(err);
                const result = (
                    <p style={{'color' : 'red'}}>
                        Invalid Citizen NRIC or Issuer NRIC.<br/>
                    </p>
                );
                this.setState({'actionMessage' : result});
            });

        this.setState({p_nric: '', v_date: this.getDatePlus8hours(new Date()), e_nric: ''});
    }

    render() {
        const {p_nric, v_date, e_nric} = this.state;
        var dateFormat = require('dateformat');
        const v_date_str = dateFormat(v_date, "yyyy-mm-dd");

        return (
            <div className="dashboard-tableContainer-div">
                <div className="vaccineissue-typical-content-div">
                    <h2>Issue Vaccination Certificate</h2>
                    <form onSubmit={this.submitHandler}>

                        <div style={{'marginBottom':'10px'}}>
                            <label>Vaccination Date: </label>
                            <TextField name="v_date" type="date" value={v_date_str} onChange={this.changeHandler}/>
                        </div>

                        <div>
                            <label>Citizen NRIC: </label>
                            <input type="text" name="p_nric" value={p_nric} onChange={this.changeHandler}/>
                        </div>
                        
                        <div>
                            <label>Issued By: </label>
                            <input type="text" name="e_nric" value={e_nric} onChange={this.changeHandler}/>
                        </div>

                        <label></label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div style={{'paddingLeft':'20px'}}>{this.state.actionMessage}</div>
            </div>
        );
    }
}