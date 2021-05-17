import React, {Component} from 'react';
import '../components/login/Login.css';
import {LoginFormComponent} from '../components/login/LoginFormComponent';

export class Login extends Component {

    render(){
        return(
            <div className="login-container">
                <div className="login-header">
                    <h1>Administrative Login</h1>
                </div>
                <div className="login-wrapper">
                    <LoginFormComponent />
                </div>
        </div>
        )
    }

}

//https://stackoverflow.com/questions/46997898/updating-navbar-on-logout-reactjs