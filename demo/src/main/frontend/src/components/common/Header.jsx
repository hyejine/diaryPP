import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import { Button, Menu, MenuItem, Fade } from '@mui/material';
import { SettingsSuggestOutlined,  AccountCircle, KeyboardArrowDown} from '@mui/icons-material';
import { useState } from 'react';

const Header =(props)=>{
  const {currnetUser} = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(currnetUser);
        return (
          <div className="header">
            <Link to="/"><span className="logo">LOGO</span></Link>
            {/* {currnetUser.email ?   */}
            <div className="login">
              <Button
        onClick={handleClick}
      >
          {currnetUser.image ? currnetUser.image:<AccountCircle className="" color="disabled"/>}
              {currnetUser.name }정혜진
       <KeyboardArrowDown className="arrowDowun"/>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem >Language</MenuItem>
        <MenuItem >Font</MenuItem>
        <MenuItem >Background Color</MenuItem>
        <MenuItem >Logout</MenuItem>
        <MenuItem >프리미엄 이모지 보러가기</MenuItem>
      </Menu>
                    
              <SettingsSuggestOutlined/>
            </div>
            {/* : 
            <Link to="/auth/login"><span className="login">login</span></Link>
          } */}
          </div>
        );
}

export default Header;