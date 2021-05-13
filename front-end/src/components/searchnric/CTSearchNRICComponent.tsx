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
        p_nric: '',
        //only will be used to hold the outcome of the data
        result : [],
        result_statement : '',
    }

    onSearchResultID = (updatedInfo : any) => {
        this.setState({result : updatedInfo});
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        const p_nric = this.state.p_nric;
        searchnric_API(p_nric).then(res => {
                console.log(res);
                this.onSearchResultID(res.data);
                this.updateStatement();
            })
            .catch(err => {
                console.log(err);
                this.updateStatement();
                alert("Incorrect NRIC! please fill up again.")
            });
         //const outcome = postIssueAlerts_API(this.state);
         //outcome.then(res => {
          //   console.log(res);
         //}).catch(err => {
          //  console.log(err);
         //});
    }

    updateStatement = () => {
      if(this.state.result.length === 0) {
          this.setState({'result_statement' :  "No Result Found"});
      }
      else {
          this.setState({'result_statement' :  `successfully obtained ${this.state.result.length} records.`});
      }
    };

    render() {
        const {p_nric} = this.state;
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>Search NRIC: </label>
                        <input type="text" name="p_nric" value={p_nric} onChange={this.changeHandler}/>
                    </div>
                    <button type="submit">Search</button>
                    <div>{this.state.result_statement}</div>
                </form>
            </div>
        );
    }
}