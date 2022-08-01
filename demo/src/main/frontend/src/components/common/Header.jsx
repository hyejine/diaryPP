import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './header.scss';
const Header =()=>{

        return (
            <div className='header'>
                <span className='logo'>LOGO</span>
                <Link to="/login"></Link>
                    <span className='login'>login</span>
            </div>
        )
}

export default Header;