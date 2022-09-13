import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import DeleteIcon from '@mui/icons-material/Delete';
// import {  AccessAlarm } from '@mui/icons-material';

const Header =(props)=>{
  const {currnetUser} = props;

  console.log(currnetUser);
        return (
          <div className="header">
            <Link to="/"><span className="logo">LOGO</span></Link>
            {currnetUser.email ?  
            <div>
              {currnetUser.image ? currnetUser.image:<></>}
              {currnetUser.name}
              <DeleteIcon/>
            </div>
            : 
            <Link to="/auth/login"><span className="login">login</span></Link>
          }
          </div>
        );
}

export default Header;