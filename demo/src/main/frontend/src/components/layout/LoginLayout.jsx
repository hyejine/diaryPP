import React, { Component } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../resource/image/logo.png";
import "./main-boarder-Layout.scss";

class LoginLayout extends Component {
  render() {
    return (
      <div className="main">
        <div className="mainWrap">
          <div className="mainLogo">
            <Link to="/" className="logo">
              D,I,Y Diary
            </Link>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginLayout;
