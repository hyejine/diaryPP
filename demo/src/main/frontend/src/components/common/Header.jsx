import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
const Header =()=>{

        return (
          <div className="header">
            <Link to="/"><span className="logo">LOGO</span></Link>
            <Link to="/login"><span className="login">login</span></Link>
          </div>
        );
}

export default Header;