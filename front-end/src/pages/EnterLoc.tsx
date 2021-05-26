import {Component} from 'react';
import '../components/login/Login.css';
import {EnterLocComponent} from '../components/enterloc/EnterLocComponent';

export default class EnterLoc extends Component {

    render(){
        return(
            <div className="login-container">
                <div className="login-header">
                    <h1>Check-In</h1>
                </div>
                <div className="login-wrapper">
                    <EnterLocComponent />
                </div>
        </div>
        )
    }

}