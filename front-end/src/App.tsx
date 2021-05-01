import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link} from "react-router-dom";
import Routes from "./routes";

import enterLoc from './img/EnterLoc.png';
import checkVaccCert from './img/CheckVaccCert.png';

function App() {

  return (
    <Router>
      <div className="container">
        <Router>
          <h1>COVID-19 TURBO TRACING APP</h1>
          <div className="main-public-inputs-div">
            <a href="/about">
              <img src={enterLoc} id="enterLoc-img" alt="Enter location"/>
            </a>

              <img src={checkVaccCert} id="checkVaccCert-img" alt="Check vaccination certificate"/>
            <div>
              <Link to="/about">hello</Link>
            </div>
            <Routes/>

          </div>
        </Router>
      </div>
    </Router>
  );
}   



export default App;