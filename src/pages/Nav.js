import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <div className = "navbar">
      <h1>Tic Tac Toe</h1>

      <div className = "navlink">
        
        <NavLink to = "/" activeClassName = "active" className = "link">Home</NavLink>
        <NavLink to="/source-code" activeClassName = "active" className = "link">Source Code</NavLink>
        <NavLink to = "/about" activeClassName = "active" className = "link">About</NavLink>
        <NavLink to="/developer" activeClassName = "active" className = "link">Developers</NavLink>
      
      </div>
    </div>
  );
}
