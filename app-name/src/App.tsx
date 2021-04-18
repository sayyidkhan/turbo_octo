import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link} from "react-router-dom";
import Routes from "./routes";

function App() {

  return (
    <Router>
      <div className="container">
          <Router>
              <nav>
                  <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/about">About</Link></li>
                  </ul>
              </nav>
              <Routes/>
          </Router>
      </div>
    </Router>
  );
}

export default App;