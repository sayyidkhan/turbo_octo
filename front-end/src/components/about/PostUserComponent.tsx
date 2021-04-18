import {Component, useState} from "react";
import axios from 'axios';
import {postNewUser_API} from "../../services/about/about_api";
import * as React from "react";


export class PostUserComponent extends Component {

    constructor(props : any) {
        super(props);
    }

    state = {
        'email': '',
        'age': 0,
        //only will be used to hold the outcome of the data
        'createdUsername' : '',
    }

    onUpdateUserID = (updatedInfo : any) => {
        const result = (
            <p style={{'fontSize' : 12}}>{updatedInfo.userId}<br/>
                created successfully.<br/>
                refresh page to see updated list.
            </p>
        );
        this.setState({'createdUsername' : result});
        console.log(updatedInfo);
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    mapDTO = () => {
        //backend only accept this data shape
        const dto = {'email': this.state.email, 'age': this.state.age};
        //purge any existing data, if there is any
        this.setState({'createdUsername' : ''});
        return dto;
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        //map data to DTO object for sending //
        const dto  = this.mapDTO();
        //map data to DTO object for sending //
        axios.post("http://localhost:5000/users",dto)
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
        this.setState({email: '', age: 0});
    }

    render() {
        const {age , email} = this.state;
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label style={{'fontSize' : 18}}>Email: </label>
                        <input type="text" name="email" value={email} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label style={{'fontSize' : 18}}>Age: </label>
                        <input type="number" name="age" value={age} onChange={this.changeHandler}/>
                    </div>
                    <button type="submit">Create New User</button>
                    <div>{this.state.createdUsername}</div>
                </form>
            </div>
        );
    }
}