import {Component, useState} from "react";
import axios from 'axios';
import * as React from "react";
import {searchnric_API} from "./api/searchnric_api";
import './SearchNRICComponent.css';

export class SearchNRIC extends Component {

    constructor(props : any) {
        super(props);
    }

    state = {
        'p_nric': '',
        //only will be used to hold the outcome of the data
        'inputNRIC' : ''
    }

    onSearchResultID = (updatedInfo : any) => {
        const result = (
            <p style={{'fontSize' : 14}}>Successfully searched!
            </p>
        );
        this.setState({'inputNRIC' : result});
        console.log(updatedInfo);
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        axios.get("http://localhost:5000/searchbynric/:nric")
            .then(res=> {
                console.log(res);
                this.onSearchResultID(res.data);
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
        this.setState({p_nric: ''});
    }

    render() {
        const {p_nric} = this.state;
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>Search NRIC: </label>
                        <input type="text" name="NRIC" value={p_nric} onChange={this.changeHandler}/>
                    </div>
                    <button type="submit">Issue alert</button>
                    <div>{this.state.inputNRIC}</div>
                </form>
            </div>
        );
    }
}