import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link} from "react-router-dom";
import Routes from "./routes";
import Login from './pages/Login';

import enterLoc from './img/EnterLoc.png';
import checkVaccCert from './img/CheckVaccCert.png';

//not using now
function App() {

  // const [token, setToken] = useState();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  // const toShow = String(token);
  // const toHide = "toHide";

  // const adminAccess = ["dashboard", "contact", "vaccination", "alerts", "reports", "account", "logout"];
  // const healthCareAccess = ["dashboard", "contact", "vaccination", "logout"];
  // const businessAccess = ["dashboard", "alerts", "logout"];
  // var accessList = adminAccess;

  // if(token == "admin"){
  //   accessList = adminAccess;
  // }else if(token == "healthcare"){
  //   accessList = healthCareAccess;
  // }else if(token == "business"){
  //   accessList = businessAccess;
  // }

  return (
    <Router>
      <div className="container">
          <Router>
              {/* <nav>
                  <ul>
                      <li className={accessList.includes("dashboard") ? toShow : toHide}><Link to="/home">Dashboard</Link></li>
                      <li className={accessList.includes("contact") ? toShow : toHide}><Link to="/about">Contact Tracing</Link></li>
                      <li className={accessList.includes("vaccination") ? toShow : toHide}><Link to="/login">Vaccination Records</Link></li>
                      <li className={accessList.includes("alerts") ? toShow : toHide}><Link to="/login">Public Alerts</Link></li>
                      <li className={accessList.includes("reports") ? toShow : toHide}><Link to="/login">Reports</Link></li>
                      <li className={accessList.includes("account") ? toShow : toHide}><Link to="/login">Manage Accounts</Link></li>
                      <li className={accessList.includes("logout") ? toShow : toHide}><Link to="/login" onClick={() => window.location.reload()}>Logout</Link></li>
                  </ul>
              </nav> */}
              <Routes/>
          </Router>
      </div>
    </Router>
  );
}

export default App;