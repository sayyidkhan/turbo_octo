import {Component} from "react";
import axios from 'axios';
import './Login.css';
import history from '../../history';

//import api

export class LoginFormComponent extends Component {

    state = {
        'e_nric': '',
        'password': '',
        'admintype': 'public',
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    submitHandler = (e: any) => {
        e.preventDefault();

        this.validateUser();

        const adminTypes = ["government", "business", "healthcare"];
        const userType = sessionStorage.getItem('userType') ?? "public";
        //console.log('admintype in sessionStorage: ', sessionStorage.getItem('userType'));

        if(adminTypes.includes(userType)){
            history.push('/Dashboard');
            window.location.reload(false);
        }
    }

    validateUser = () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "e_nric": this.state.e_nric,
            "password": this.state.password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        
        fetch("http://localhost:5000/e_user/login", requestOptions)
        .then(response => response.json())
        .then(e_user => { 

            var userType = "public";
            switch(e_user.admintype){
                case 'G': userType = 'government'; break;
                case 'H': userType = 'healthcare'; break;
                case 'B': userType = 'business'; break;
            }

            this.setState({'admintype': userType});
            sessionStorage.setItem('userType', userType);
        })
        .catch(error => {
            console.log('error', error);
        });
    };

    submitHandler_temp = (e: any) => {
        e.preventDefault();

        var temp_userType = this.state.e_nric;
        const adminTypes = ["government", "business", "healthcare"];
        if(!adminTypes.includes(temp_userType)){
            temp_userType = "public";
        }

        this.setState({'userType' : temp_userType});
        sessionStorage.setItem('userType', temp_userType);
        //checking use
        //this.setState({'userType' : this.state.e_nric}, () => {alert(this.state.userType);}); 
        //alert(sessionStorage.getItem('userType'));

        history.push('/Dashboard');
        window.location.reload(false);
    }

    render() {
        const {e_nric , password} = this.state;
        return (
            <div>
                <div className="validationMsg">This NRIC or password is invalid.</div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>NRIC:</label>
                        <input type="text" name="e_nric" value={e_nric} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" value={password} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}