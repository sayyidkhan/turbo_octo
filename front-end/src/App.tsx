import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "./routes";
import Navbar from "./Navbar";

function App() {

  if(sessionStorage.getItem('userType') === null){
    sessionStorage.setItem('userType', "P");
  }

  return (
    <Router>
      <Routes />
      <Navbar />
    </Router>
  );
}

export default App;