import React from 'react';
import '../App.css';
import Routes from "../routes";

import enterLoc from '../img/EnterLoc.png';
import checkVaccCert from '../img/CheckVaccCert.png';

export default function Home() {
    return (
        <div className = "content-container">
            <div className="main-public-inputs-div">
                <a href="/about">
                    <img src={enterLoc} id="enterLoc-img" alt="Enter location"/>
                </a>
            </div>
        </div>
    )
}