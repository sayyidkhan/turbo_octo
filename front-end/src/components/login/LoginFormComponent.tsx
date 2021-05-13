import {Component} from "react";
import axios from 'axios';
import './Login.css';
import history from '../../history';

//import api

export class LoginFormComponent extends Component {

    state = {
        'username': '',
        'password': '',
        //only will be used to hold the outcome of the data
        'userType': '',
    }

    onUpdateUser = (user : any) => {
        //get usertype from database
        //...

        this.setState({'userType' : user.userType});
        //console.log(updatedInfo);
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    mapDTO = () => {
        //backend only accept this data shape
        const dto = {'username': this.state.username, 'password': this.state.password};
        //purge any existing data, if there is any
        //this.setState({'userType' : ''});
        return dto;
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        const dto  = this.mapDTO();

        try {
            const res = await axios({
              method: 'PATCH',
              url: 'http://localhost:5000/e_users',
              params: { this.state.username },
              data: { completed: checked }
            });
            return res;
        } catch (err) {
        throw new Error(err.response?.data.message);
        }

        //map data to DTO object for sending to backend //
        axios.post("http://localhost:5000/users", dto)
            .then(res => {
                console.log(res);
                this.onUpdateUser(res.data);
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
        //this.setState({email: '', age: 0});
    }

    submitHandler_temp = (e: any) => {
        e.preventDefault();

        var temp_userType = this.state.username;
        const adminTypes = ["government", "business", "healthcare"];
        if(!adminTypes.includes(temp_userType)){
            temp_userType = "public";
        }

        this.setState({'userType' : temp_userType});
        sessionStorage.setItem('userType', temp_userType);
        //checking use
        //this.setState({'userType' : this.state.username}, () => {alert(this.state.userType);}); 
        //alert(sessionStorage.getItem('userType'));

        history.push('/Dashboard');
        window.location.reload(false);
    }

    render() {
        const {username , password} = this.state;
        return (
            <div>
                <form onSubmit={this.submitHandler_temp}>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" value={username} onChange={this.changeHandler}/>
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