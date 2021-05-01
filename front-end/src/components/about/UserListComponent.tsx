import React, {Component} from 'react';

import {ScrollerComponent} from "./scroller/ScrollerComponent";
import {getUsers_API} from "./api/about_api";


export class UserListComponent extends Component {

    state = {
        loadingStatus : true,
        status : 0,
        result : []
    }

    componentDidMount() {
        getUsers_API().then(res => {
            const result = res;
            console.log(result);
            this.setState({'result' : res.data , 'status' : res.status });
        }).catch(err => {
            console.log(err);
            this.setState({'result' : [] , 'status' : err.status })
        });
    }

    createList() {
        //if status is success and list is not empty
        if(this.state.status === 200 && this.state.result.length !== 0){
            const myList = this.state.result;
            return <ScrollerComponent myList={myList} />;
        }
        else {
            return <p>No record.</p>
        }
    }

    render() {
        return (
            <div>
                {this.createList()}
            </div>
        );
    }
}