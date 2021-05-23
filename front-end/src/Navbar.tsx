import { useState } from "react";
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
        accessBy: ["P"],
      }, 
      {
        id: 2,
        path: "/Login",
        text: "Login",
        accessBy: ["P"],
      },
      {
        id: 3,
        path: "/Dashboard",
        text: "Dashboard",
        accessBy: ["G", "B", "H"],
      },
      {
        id: 4,
        path: "/ContactTracing",
        text: "Contact Tracing",
        accessBy: ["G", "H"],
      },
      {
        id: 5,
        path: "/VaccinationRecords",
        text: "Vaccination",
        accessBy: ["G", "H"],
      },
      {
        id: 6,
        path: "/PublicAlerts",
        text: "Public Alerts",
        accessBy: ["G", "B"],
      },
      {
        id: 7,
        path: "/TriggerAlert",
        text: "Trigger Alert",
        accessBy: ["H"],
      },
      {
        id: 8,
        path: "/UpdateCovidStatus",
        text: "Update Covid Status",
        accessBy: ["H"],
      },
      {
        id: 9,
        path: "/Reports",
        text: "Reports",
        accessBy: ["G"],
      },
      {
        id: 10,
        path: "/Accounts",
        text: "Manage Accounts",
        accessBy: ["G"],
      },
      {
        id: 11,
        path: "/",
        text: "Logout",
        accessBy: ["G", "B", "H"],
      }
  ];

  const [navbarOpen, setNavbarOpen] = useState(userType === "P"  || userType === "" ? false : true);

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
    sessionStorage.setItem('userType', "P");
    closeMenu();
    history.push('/');
  }


  return (
      <nav className="navBar">
      <button onClick={handleToggle} className={userType === "P" ? "toShow" : "toHide"}>
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
                onClick={userType === "P" ? () => closeMenu() : link.text === "Logout" ? () => logoutAction() : () => doNothing()}
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
