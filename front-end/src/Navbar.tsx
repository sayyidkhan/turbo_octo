import React, { useState } from "react";
import { NavLink } from "react-router-dom"
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"
import Login from './pages/Login';

export default function Navbar(){

    const links = [
        {
          id: 1,
          path: "/Home",
          text: "Home",
        }, 
        {
          id: 2,
          path: "/Login",
          text: "Login",
        },
        {
          id: 3,
          path: "/Dashboard",
          text: "Dashboard",
        },
        {
          id: 4,
          path: "/ContactTracing",
          text: "Contact Tracing",
        },
        {
          id: 5,
          path: "/VaccinationRecords",
          text: "Vaccination Records",
        },
        {
          id: 6,
          path: "/PublicAlerts",
          text: "Public Alerts",
        },
        {
          id: 7,
          path: "/Reports",
          text: "Reports",
        },
        {
          id: 8,
          path: "/ManageAccounts",
          text: "Manage Accounts",
        },
        {
          id: 9,
          path: "/Home",
          text: "Logout",
        }
    ]

    const [navbarOpen, setNavbarOpen] = useState(false);

    const handleToggle = () => {
        setNavbarOpen(prev => !prev)
    }

    const closeMenu = () => {
        setNavbarOpen(false)
    }

    return (
        <nav className="navBar">
        <button onClick={handleToggle}>
          {
            navbarOpen ? 
            <MdClose 
              style={{color: "#fff", width: "40px", height: "40px" }} 
            /> : 
            <FiMenu 
              style={{color: "#7b7b7b", width: "40px", height: "40px" }} 
            />
          }
        </button>
        <ul className={`menuNav ${navbarOpen ? " showMenu": ""}`}>
          {links.map((link) => {
            return (
              <li key={link.id}>
                <NavLink 
                  to={link.path} 
                  activeClassName="active-link"
                  onClick={() => closeMenu()}
                  exact
                >
                  {link.text}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
