import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Link} from "react-router-dom";
import Routes from "./routes";
import Navbar from "./Navbar";
//import useLocalStorage from './services/useLocalStorage';

function App() {

  return (
    <Router>
      <Routes />
      <Navbar />
    </Router>
  );
  
}

export default App;