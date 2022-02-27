import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <details>
        <summary></summary>
        <nav className="menu">
          <Link to='/Home'>Home</Link>
          <Link to='/profile'>Profile</Link>
          <Link to='/change-password'>Change Password</Link>
          <Link to="/">Log out</Link>
        </nav>
      </details>
    </>
  );
};

export default Navbar;
