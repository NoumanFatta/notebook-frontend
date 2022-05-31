import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import createContext from "../context/createContext";


const Navbar = (props) => {
  const { alert } = useContext(createContext);
  const navigate = useNavigate()

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            NoteBook
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {localStorage.getItem("token") &&
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className='nav-link' to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className='nav-link' to="/about">
                    About
                  </NavLink>
                </li>
              </ul>
            }
            {!localStorage.getItem("token") ? <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end w-100">
              <li className="nav-item">
                <NavLink className="nav-link m-2" to="/signup" >Sign up</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link m-2" to="/login" >Login</NavLink>
              </li>
            </ul> : <button onClick={() => { localStorage.clear(); navigate('/login') }} className="btn btn-primary" >Logout</button>}

          </div>
        </div>
      </nav>
      <Alert alert={alert} />
      {props.children}
    </>
  );
};

export default Navbar;
