import {Component} from "react";
import axios from 'axios';
import { TextField } from "@material-ui/core";
import './IssueAlertsComponent.css';

interface IProps {
    setRenderStatus(status:any) : any;
}

interface IState {
}

export class IssueAlerts extends Component<IProps, IState> {

    state = {
        'alertTitle': 'Low',
        'alertDetail': '',
        'alertDate': new Date(),
        'active': 'true',
        'location_id': 0,
        'actionMessage': ''
    }

    onUpdateAlertListID = (updatedInfo : any) => {
        const result = (
            <p style={{'color':'green'}}>
                New alert with location Id {updatedInfo.location_id} added successfully.
            </p>
        );
        this.setState({'actionMessage': result});
        this.props.setRenderStatus(1);
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    mapDTO = () => {
        const dto = {'alertTitle': this.state.alertTitle, 'alertDetail': this.state.alertDetail, 'alertDate': this.state.alertDate, 'active': this.state.active, 'location_id': this.state.location_id};
        this.setState({'actionMessage': ''});
        return dto;
    }

    checkValidation(){

        if(this.state.alertDetail.trim() === ''){
            const result = (
                <p style={{'color':'red'}}>
                    Please fill in the alert details.
                </p>
            );
            this.setState({'actionMessage': result});
            return false;
        }else {
            this.setState({actionMessage: ''});
            return true;
        }
    }

    submitHandler = (e: any) => {
        e.preventDefault();

        if(!this.checkValidation()){
            return;
        }

        const dto  = this.mapDTO();

        axios.post("http://localhost:5000/alertlist", dto)
            .then(res=> {
                console.log(res);
                this.onUpdateAlertListID(res.data);
            })
            .catch(err => {
                console.log(err);
                const result = (
                    <p style={{'color':'red'}}>
                        Invalid Location ID.
                    </p>
                );
                this.setState({'actionMessage': result});
            });

        this.setState({alertTitle: 'Low', alertDetail: '', alertDate: new Date(), active: 'true', location_id: 0});
    }

    render() {

        const {alertTitle , alertDetail, alertDate, active, location_id} = this.state;
        var dateFormat = require('dateformat');
        const alertDate_str = dateFormat(alertDate, "yyyy-mm-dd");

        return (
            <div className="issue-alert-div">
                <form onSubmit={this.submitHandler}>
                    <div style={{'paddingBottom':'10px'}}>
                        <label>Date: </label>
                        <TextField name="alertDate" type="date" value={alertDate_str} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label>Location: </label>
                        <input type="number" name="location_id" value={location_id} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label style={{'height':'60px', 'marginTop':'-30px'}}>Details: </label>
                        <textarea name="alertDetail" value={alertDetail} onChange={this.changeHandler}></textarea>
                    </div>
                    <div>
                        <label>Alert level: </label>
                        <select name="alertTitle" value={alertTitle} onChange={this.changeHandler}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div>
                        <label>Active: </label>
                        <select name="active" value={active} onChange={this.changeHandler}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <label></label> <button type="submit">Issue alert</button>
                </form>
                <div style={{'paddingLeft':'20px'}}>{this.state.actionMessage}</div>
            </div>
        );
    }
}