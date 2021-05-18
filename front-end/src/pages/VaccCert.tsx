import React, {Component} from 'react';
import '../components/vacccert/vaccCert.css';
import {VaccCertComponent} from '../components/vacccert/VaccCertComponent';
import {VaccCertInputComponent} from '../components/vacccert/VaccCertInputComponent'

export default class VaccCert extends Component {

    state = {
        'userData': ''
    }

    getUserData(userData : any) : any{
        this.setState({'userData': userData});
    }

    render(){
        return(
            <div className="vaccCert-container">
                <div className="vaccCert-header">
                    <h1>Check Vaccination Certificate</h1>
                </div>
                <div className="login-wrapper">
                    <VaccCertInputComponent getUserData={(e) => this.getUserData(e)}/>
                </div>
                <div className="vaccCert-wrapper">
                    <VaccCertComponent userData={this.state.userData} />
                </div>
        </div>
        )
    }

}