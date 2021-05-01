import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
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
<<<<<<< HEAD
}   


=======
  
}
>>>>>>> ca2b45f53eca75b687e526f478a8cae590c4212f

export default App;