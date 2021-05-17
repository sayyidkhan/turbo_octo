import {Component} from 'react';
import '../App.css';
import '../components/accounts/Accounts.css';
import {AccountsFormComponent} from "../components/accounts/AccountsFormComponent";
import {AccountsTableComponent} from "../components/accounts/AccountsTableComponent";
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';


export default class Accounts extends Component {

    state = {
        selected_nric: '',
        listener_counter : 0,
    }

    getNric(selected_nric : string) : any{
        if(selected_nric !== '' && selected_nric !== null) {
            this.setState({ 'selected_nric' : selected_nric });
        }
    }

    refreshAllComponents = () => {
        //calling setState will re-render components
        this.setState({ listener_counter : this.state.listener_counter + 1});
        console.log("re-render: " + this.state.listener_counter);
    }


    render(){
        return (
            <div className="dashboard-container-general">
                <h1>Manages Accounts</h1>
                <div className="under-page-title-div">
                    <CurrentLoginUserComponent/>
                </div>

                <div className="accounts-form-wrapper">
                    <AccountsFormComponent selected_nric={this.state.selected_nric} refresh_component={this.refreshAllComponents} />
                </div>

                <div className="accounts-table-container">
                    <div className="accounts-table-wrapper">
                        <AccountsTableComponent getNric={(e) => this.getNric(e)} listener_counter={this.state.listener_counter} />
                    </div>
                </div>
            </div>
        );
    }
}

