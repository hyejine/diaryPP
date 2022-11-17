import React, { Component } from 'react';
import { Link, Outlet } from "react-router-dom";
import logo from "../../resource/image/logo.png";

class LoginLayout extends Component {
    render() {
        return (
            <div>
                 <Link to="/">
        <img src={logo} alt="" className="logo" style={{width:100}} />
      </Link>
      <div>
      <Outlet />
      </div>
            </div>
        );
    }
}

export default LoginLayout;