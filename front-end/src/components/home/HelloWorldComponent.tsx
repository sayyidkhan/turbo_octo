import React, {Component} from 'react';
import {getHello_API} from "../../services/home/home_api";

export class HelloWorldComponent extends Component {

    state = {
        loadingStatus : true,
        status : 0,
        result : ""
    }

     componentDidMount() {
         getHello_API().then(res => {
             const result = res;
             console.log(result);
             this.setState({'result' : res.data , 'status' : res.status });
         }).catch(err => {
             console.log(err);
             this.setState({'result' : "backend not connected..." , 'status' : err.status })
         });
    }

    render() {
        return (
            <div>
                <p style={{color : (this.state.status === 200) ? 'green' : 'red' }}>{this.state.result}</p>
            </div>
        );
    }
}