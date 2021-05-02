import {Component} from "react";
import './Accounts.css';
import axios from 'axios';

export class AccountsFormComponent extends Component {

    constructor(props : any) {
        super(props);
    }

    state = {
        'e_nric': '',
        'firstname': '',
        'lastname': '',
        'password': '',
        'admintype': "government",
    }

    mapDTO = () => {
        const dto = {
            'e_nric': this.state.e_nric, 
            'firstname': this.state.firstname,
            'lastname': this.state.lastname,
            'password': this.state.password,
            'admintype': this.state.admintype,
        };
        return dto;
    }

    onUpdateAccount = (updatedInfo : any) => {
        const result = (
            <p style={{'fontSize' : 12}}>{updatedInfo.username}<br/>
                created successfully.<br/>
                refresh page to see updated list.
            </p>
        );
        this.setState({'username' : result});
        console.log(updatedInfo);
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        const dto  = this.mapDTO();
        axios.post("http://localhost:5000/e_user", dto)
            .then(res=> {
                console.log(res);
                this.onUpdateAccount(res.data);
            })
            .catch(err => {
                console.log(err);
            });

        this.setState({e_nric: '', firstname: '', lastname: '', password: '', admintype: ''});
    }

    render() {

        const {e_nric, firstname, lastname, password, admintype} = this.state;

        return (
            <div className="accounts-form">
                <form onSubmit={this.submitHandler}>
                    <h3>Manage Accounts</h3>
                    <div>
                        <label>User Type: </label>
                        <select name="admintype" defaultValue={admintype} onChange={this.changeHandler}>
                            <option value="government">Government</option>
                            <option value="healthcare">Health Care</option>
                            <option value="business">Business</option>
                        </select>
                    </div>
                    <div>
                        <label>NRIC: </label>
                        <input type="text" name="e_nric" value={e_nric} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label>First Name: </label>
                        <input type="text" name="firstname" value={firstname} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label>Last Name: </label>
                        <input type="text" name="lastname" value={lastname} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" name="password" value={password} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <button type="submit" className="submit-button">Create</button>
                        <button type="reset" className="clear-button">Clear</button>
                    </div>
                </form>
            </div>
        );
    }
}
