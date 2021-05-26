import {Component} from 'react';
import '../App.css';

import enterLoc from '../img/EnterLoc.png';
import checkVaccCert from '../img/CheckVaccCert.png';
import AlertListComponent from "../components/listing/AlertListComponent";

export default class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <div className="home-public-header-div">
                    <h1>Covid-19 TurboTrace</h1>
                </div>

                <div className="home-imgContainer-div">
                    <div id="images">
                        <a href="/EnterLocation">
                            <img src={enterLoc} className="home-img" alt="Enter location"/>
                        </a>
                        <a href="/CheckVaccCert">
                            <img src={checkVaccCert} className="home-img" alt="Check vaccination certificate"/>
                        </a>
                    </div>
                </div>

                <AlertListComponent/>

            </div>
        )
    }
}