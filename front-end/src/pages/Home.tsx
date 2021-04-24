import React from 'react';
import logo from '../img/logo.svg';
import {HelloWorldComponent} from "../components/home/HelloWorldComponent";
import {BrowserRouter as Router, Link} from "react-router-dom";
import Routes from "../routes";

import enterLoc from '../img/EnterLoc.png';
import checkVaccCert from '../img/CheckVaccCert.png';

export default function Home() {
    return (
        <div className="main-public-inputs-div">
            \n
            <a href="/about">
                <img src={enterLoc} id="enterLoc-img" alt="Enter location"/>
            </a>

            <img src={checkVaccCert} id="checkVaccCert-img" alt="Check vaccination certificate"/>
            <Link to="/about">hello</Link>
        </div>

    )
}

