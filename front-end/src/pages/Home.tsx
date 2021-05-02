import React from 'react';
import '../App.css';

import enterLoc from '../img/EnterLoc.png';
import checkVaccCert from '../img/CheckVaccCert.png';
import {AlertsTable} from '../components/alertstable/AlertsTableComponent';
import {Box} from "@material-ui/core";

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-public-header-div">
                <h1>Covid-19 TurboTrace</h1>
            </div>
            
            <div className="home-imgContainer-div">
                <div id ="images">
                    <a href="/EnterLocation">
                        <img src={enterLoc} className="home-img" alt="Enter location"/>
                    </a>
                    <a href="/CheckVaccCert">
                        <img src={checkVaccCert} className="home-img" alt="Check vaccination certificate"/>
                    </a>
                </div>
            </div>

            <div className="home-tableContainer-div">
                <h2>Recent Covid-19 alerts</h2>
                <Box justifyContent="center" m={1} p={0} bgcolor="background.paper">
                    <Box p={1} m={1} bgcolor="white.100">
                        <AlertsTable />
                    </Box>
                </Box>
            </div>
        </div>
    )
}