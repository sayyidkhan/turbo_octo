import {Component} from "react";
import axios from 'axios';
import './UpdateCovidStatusComponent.css';

export class UpdateCovidStatus extends Component {

    state = {
        'p_nric': '',
        'covid_status': 'true',
        'actionMessage' : ''
    }

    onUpdateCovidStatusID = (updatedInfo : any) => {
        const result = (
            <p style={{'color' : 'green'}}>
                Covid-19 status for citizen with NRIC {updatedInfo.p_nric} updated successfully.<br/>
            </p>
        );
        this.setState({'actionMessage' : result});
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    mapDTO = () => {
        const dto = {'covid_status': this.state.covid_status};
        this.setState({'actionMessage' : ''});
        return dto;
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        const dto  = this.mapDTO();
        const p_nric = this.state.p_nric;

        axios.patch(`http://localhost:5000/p_user/${p_nric}`, dto)
            .then(res=> {
                console.log(res);
                this.onUpdateCovidStatusID(res.data);
            })
            .catch(err => {
                console.log(err);
                const result = (
                    <p style={{'color' : 'red'}}>
                        Invalid Citizen NRIC.<br/>
                    </p>
                );
                this.setState({'actionMessage' : result});
            });

        this.setState({p_nric: '', covid_status: ''});
    }

    render() {
        const {p_nric, covid_status} = this.state;

        return (
            <div className="update-covid-div">
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>Citizen NRIC: </label>
                        <input type="text" name="p_nric" value={p_nric} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label>Covid-19 Status: </label>
                        <select name="covid_status" value={covid_status} onChange={this.changeHandler}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <label></label>
                    <button type="submit">Update Status</button>
                </form>
                <div style={{'paddingLeft':'20px'}}>{this.state.actionMessage}</div>
            </div>
        );
    }
}