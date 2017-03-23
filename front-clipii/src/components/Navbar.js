import React, { Component } from 'react';
import { Link } from "react-router";

class Navbar extends Component {
  render() {

    return (
      <div className="container-fluid">

        <nav className="navbar">
          <div className="container-fluid">

            <div className="navbar-header pull-left">
              <Link to="/" className="navbar-brand">clipii</Link>
            </div>
            <div className="navbar-header pull-right">
              <Link to="/" className="navbar-brand">Login</Link>
              <Link to="/" className="navbar-brand">Register</Link>
            </div>

          </div>
        </nav>

      </div>
    )
  }
}

export default Navbar;