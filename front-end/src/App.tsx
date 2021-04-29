import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Link} from "react-router-dom";
import Routes from "./routes";
import Navbar from "./Navbar";

function App() {

  if(sessionStorage.getItem('userType') === null){
    sessionStorage.setItem('userType', "public");
  }

  return (
    <Router>
      <Routes />
      <Navbar />
    </Router>
  );
  
}

export default App;