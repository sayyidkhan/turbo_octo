import * as React from "react";
import {Component} from "react";
import {searchnric_API} from "./api/searchnric_api";
import './SearchNRICComponent.css';

interface SearchNricProps {
    callback_function : Function;
}

export default class SearchNRIC extends Component<SearchNricProps> {

    update_list : Function;

    constructor(props: SearchNricProps) {
        super(props);
        this.update_list = this.props.callback_function;
    }

    state = {
        p_nric: '',
        //only will be used to hold the outcome of the data
        result : [],
        result_statement : '',
    }

    onSearchResultID = (updatedInfo : any) => {
        this.setState({result : updatedInfo});
        this.update_list(updatedInfo);
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
                /*alert("Incorrect NRIC! please fill up again.")*/
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
          this.update_list(this.state.result);
          this.setState({'result_statement' :  `Successfully obtained ${this.state.result.length} records.`});
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
                    <div>{this.state.result_statement}</div>
                    <button type="submit">Search</button>
                </form>
            </div>
        );
    }
}