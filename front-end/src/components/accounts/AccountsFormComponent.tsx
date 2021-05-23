import {Component} from "react";
import './Accounts.css';
import axios from 'axios';

interface IProps {
    selected_nric : string;
    refresh_component : Function;
}

interface IState {
}

export class AccountsFormComponent extends Component<IProps, IState> {

    state = {
        'e_nric': '',
        'firstname': '',
        'lastname': '',
        'password': '',
        'admintype': "G",
        'actionMessage': '',
        'isAccountSelected': false,
        'action': 'C'
    }

    componentDidUpdate(){
        setTimeout(() => this.setState({actionMessage:''}), 5000);
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

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    checkValidation(){

        const {e_nric, firstname, lastname, password, admintype} = this.state;

        if(e_nric.trim() === '' || firstname.trim() === '' || lastname.trim() === '' || password.trim() === '' || admintype.trim() === ''){
            return false;
        }
        return true;
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        const dto  = this.mapDTO();

        if(!this.checkValidation()){
            const result = (
                <p style={{'color': 'red'}}>
                    Please fill in all the fields.
                </p>
            );
            this.setState({'actionMessage': result});
            return;
        }

        if(this.state.action === "C"){ //create account
            axios.post("http://localhost:5000/e_user", dto)
                .then(res=> {
                    const result = (
                        <p style={{'color': 'green'}}>
                            Successfully created an account for user {res.data.e_nric}.
                        </p>
                    );
                    this.setState({'actionMessage': result});
                })
                .catch(err => {
                    console.log(err);
                });

        }else if(this.state.action === "U"){ //update account
            
            axios.patch("http://localhost:5000/e_user/"+this.state.e_nric, dto)
                .then(res=> {
                    const result = (
                        <p style={{'color': 'green'}}>
                            Successfully updated the account for user {res.data.e_nric}.
                        </p>
                    );
                    this.setState({'actionMessage': result});
                })
                .catch(err => {
                    console.log(err);
                });

        }else if(this.state.action === "D"){ //delete account

            axios.delete("http://localhost:5000/e_user/"+this.state.e_nric)
                .then(res=> {
                    const result = (
                        <p style={{'color': 'green'}}>
                            Successfully deleted the account for user {this.state.e_nric}.
                        </p>
                    );
                    this.setState({'actionMessage': result});
                })
                .catch(err => {
                    console.log(err);
                });
        }

        this.handleFormReset();


    }

    handleFormReset  = () => { 
        this.setState({
            'e_nric': '',
            'firstname': '',
            'lastname': '',
            'password': '',
            'admintype': 'G',
            'isAccountSelected': false,
            'action': 'C'
        });

        this.props.refresh_component();
    }

    getUserBySelectedNric = async (nric : string) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        
        fetch("http://localhost:5000/e_user/"+nric, requestOptions)
        .then(response => response.json())
        .then(e_user => { 

            this.setState({
                'e_nric': e_user.e_nric,
                'firstname': e_user.firstname,
                'lastname': e_user.lastname,
                'password': e_user.password,
                'admintype': e_user.admintype,
                'isAccountSelected': true
            });

        })
        .catch(error => {
            console.log('error', error);
        });
    };


    render() {

        const {e_nric, firstname, lastname, password, admintype, isAccountSelected} = this.state;
        
        if(sessionStorage.getItem('clickedAccount') === 'yes'){
            sessionStorage.setItem('clickedAccount', 'no'); //set item to no to prevent looping for getUserBySelectedNric()
            this.getUserBySelectedNric(this.props.selected_nric);
        }

        return (
            <div className="accounts-form">
                <form onSubmit={this.submitHandler} onReset={this.handleFormReset}>
                    <div>
                        <label>User Type: </label>
                        <select name="admintype" value={admintype} onChange={this.changeHandler}>
                            <option value="G">Government</option>
                            <option value="H">Health Care</option>
                            <option value="B">Business</option>
                        </select>
                    </div>
                    <div>
                        <label>NRIC: </label>
                        <input type="text" name="e_nric" value={e_nric} onChange={this.changeHandler} readOnly={isAccountSelected}/>
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
                        <button type="submit" className={isAccountSelected ? "toHide" : "submit-button"} onClick={() => this.setState({'action': 'C'})}>Create</button>
                        <button type="submit" className={isAccountSelected ? "save-button" : "toHide"} onClick={() => this.setState({'action': 'U'})}>Save</button>
                        <button type="submit" className={isAccountSelected ? "delete-button" : "toHide"} onClick={() => this.setState({'action': 'D'})}>Delete</button>
                        <input type="reset" className= "clear-button" value={'Clear'}/>
                    </div>
                </form>
                <div>{this.state.actionMessage}</div>
            </div>
        );
    }
}
