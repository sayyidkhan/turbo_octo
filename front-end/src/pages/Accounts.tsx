import {Component} from 'react';
import '../App.css';
import '../components/accounts/Accounts.css';
import {AccountsFormComponent} from "../components/accounts/AccountsFormComponent";
import {AccountsTableComponent} from "../components/accounts/AccountsTableComponent";
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';


export class Accounts extends Component{

    state = {
        status: 0,
        selected_nric: ''
    }

    getNric(selected_nric : string) : any{
        if(selected_nric !== '' && selected_nric !== null){
            this.setState({'selected_nric': selected_nric});
        }
    }

    render(){
        return (
            <div className="dashboard-container-general">
                <h1>Manages Accounts</h1>
                <div className="under-page-title-div">
                    <CurrentLoginUserComponent/>
                </div>

                <div className="accounts-form-wrapper">
                    <AccountsFormComponent selected_nric={this.state.selected_nric} status={this.state.status} />
                </div>

                <div className="accounts-table-container">
                    <div className="accounts-table-wrapper">
                        <AccountsTableComponent getNric={(e) => this.getNric(e)}/>
                    </div>
                </div>
            </div>
        );
    }
}

