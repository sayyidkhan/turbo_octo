import {Component} from "react";
import axios from 'axios';
import * as React from "react";
import '../login/Login.css'


export class VaccCertInputComponent extends Component {

    state = {
        'p_nric': '',
        //only will be used to hold the outcome of the data
        'getData' : '',
    }

    onUpdateUserID = (updatedInfo : any) => {
        const result = (
            <p style={{'fontSize' : 12}}>{updatedInfo.userId}<br/>
                created successfully.<br/>
                refresh page to see updated list.
            </p>
        );
        this.setState({'getData' : result});
        console.log(updatedInfo);
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    mapDTO = () => {
        //backend only accept this data shape
        const dto = {'p_nric':this.state.p_nric};
        //purge any existing data, if there is any
        this.setState({'getData' : ''});
        return dto;
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        //map data to DTO object for sending //
        const dto  = this.mapDTO();
        //map data to DTO object for sending //
        axios.post("",dto)
            .then(res=> {
                console.log(res);
                this.onUpdateUserID(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        // const outcome = postNewUser_API(this.state);
        // outcome.then(res => {
        //     console.log(res);
        // }).catch(err => {
        //    console.log(err);
        // });
        this.setState({p_nric: ''});
    }

    render() {
        const {p_nric} = this.state;
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>NRIC:</label>
                        <input type="text" name="p_nric" value={p_nric} onChange={this.changeHandler}/>
                    </div>

                    <div>
                        <button type="submit">Check</button>
                    </div>
                </form>
            </div>
        );
    }
}