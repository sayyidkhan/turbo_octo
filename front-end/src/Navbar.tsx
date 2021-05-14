import React, { useState } from "react";
import { NavLink } from "react-router-dom"
import './App.css';
import history from './history';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';

export default function Navbar(props : any){

  var userType = String(sessionStorage.getItem('userType'));

  const links = [
      {
        id: 1,
        path: "/",
        text: "Home",
        accessBy: ["public"],
      }, 
      {
        id: 2,
        path: "/Login",
        text: "Login",
        accessBy: ["public"],
      },
      {
        id: 3,
        path: "/Dashboard",
        text: "Dashboard",
        accessBy: ["government", "business", "healthcare"],
      },
      {
        id: 4,
        path: "/ContactTracing",
        text: "Contact Tracing",
        accessBy: ["government", "healthcare"],
      },
      {
        id: 5,
        path: "/VaccinationRecords",
        text: "Vaccination",
        accessBy: ["government", "healthcare"],
      },
      {
        id: 6,
        path: "/PublicAlerts",
        text: "Public Alerts",
        accessBy: ["government", "business"],
      },
      {
        id: 7,
        path: "/Reports",
        text: "Reports",
        accessBy: ["government"],
      },
      {
        id: 8,
        path: "/Accounts",
        text: "Manage Accounts",
        accessBy: ["government"],
      },
      {
        id: 9,
        path: "/",
        text: "Logout",
        accessBy: ["government", "business", "healthcare"],
      }
  ];

  const [navbarOpen, setNavbarOpen] = useState(userType === "public"  || userType === "" ? false : true);

  const handleToggle = () => {
      setNavbarOpen(prev => !prev)
  }

  const closeMenu = () => {
      setNavbarOpen(false)
  }

  const doNothing = () => {
    setNavbarOpen(true);
  }

  const logoutAction = () => {
    sessionStorage.setItem('userType', "public");
    closeMenu();
    history.push('/');
  }


  return (
      <nav className="navBar">
      <button onClick={handleToggle} className={userType === "public" ? "toShow" : "toHide"}>
        {
          navbarOpen ? 
          <CloseIcon
            style={{color: "#fff", width: "40px", height: "40px" }} 
          /> : 
          <MenuIcon
            style={{color: "#7b7b7b", width: "40px", height: "40px" }} 
          />
        }
      </button>
      <ul className={`menuNav ${navbarOpen ? "showMenu": ""}`}>
        {links.map((link) => {
          return (
            <li key={link.id} className={link.accessBy.includes(userType) ? "toShow" : "toHide"}>
              <NavLink 
                to={link.path} 
                activeClassName="active-link"
                onClick={userType === "public" ? () => closeMenu() : link.text === "Logout" ? () => logoutAction() : () => doNothing()}
                exact>
                {link.text}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
