import React, {Component} from 'react';
import '../components/vacccert/vaccCert.css';
import {VaccCertComponent} from '../components/vacccert/VaccCertComponent';
import {VaccCertInputComponent} from '../components/vacccert/VaccCertInputComponent'

export class VaccCert extends Component {

    render(){
        return(
            <div className="vaccCert-container">
                <div className="vaccCert-header">
                    <h1>Check Vaccination Certificate</h1>
                </div>
                <div className="login-wrapper">
                    <VaccCertInputComponent/>
                </div>
                <div className="vaccCert-wrapper">
                    <VaccCertComponent />
                </div>
        </div>
        )
    }

}