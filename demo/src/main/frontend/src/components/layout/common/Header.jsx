import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import { Button, Menu, MenuItem } from "@mui/material";
import { HelpCenter, AccountCircle, KeyboardArrowDown } from "@mui/icons-material";
import { useState } from "react";
import logo from '../../../resource/image/logo.png'
import BackgroundModal from "../../userCustom/BackgroundModal";

const Header = (props) => {
  const { currnetUser, setBackColor, setBackImage } = props;
  const [setting, setSetting] = useState(null);
  const [help, setHelp] = useState(null);
  const openSeting = Boolean(setting);
  const openHelp = Boolean(help);
  const [modalActive, setModalActive] = useState(false);

  const onUserSetting = (event) => {
    setSetting(event.currentTarget);
  };

  const onHelp = (event) => {
    setHelp(event.currentTarget);
  };

  const handleClose = () => {
    setSetting(null);
    setHelp(null);

  }; 

  const onBackgroundChg = ()=>{
    setModalActive(!modalActive);
  }

  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="" className="logo"/>
      </Link>
      <div className="login">
        <Button disableRipple onClick={onUserSetting}>
          {currnetUser?.image ? (
            currnetUser?.image
          ) : (
            <AccountCircle color="disabled" />
          )}
          <span className="userName">{currnetUser?.name}정혜진</span>
          <KeyboardArrowDown color="disabled" />
        </Button>
        <Menu anchorEl={setting} open={openSeting} onClose={handleClose}>
          <MenuItem disableRipple>Language</MenuItem>
          <MenuItem>Font</MenuItem>
          <MenuItem onClick={onBackgroundChg}>Background Color</MenuItem>
          <MenuItem>Logout</MenuItem>
          <Button  variant="contained" color="success" href="/emoji" className="emojiButton">프리미엄 이모지 보러가기</Button>
        </Menu>

        <Button disableRipple onClick={onHelp}>
        <HelpCenter color="action"/>
        </Button>
        <Menu anchorEl={help} open={openHelp} onClose={handleClose}>
          <MenuItem disableRipple>FAQ</MenuItem>
          <MenuItem>문의하기</MenuItem>
          <MenuItem>웹 정보</MenuItem>
        </Menu>
      </div>
      <BackgroundModal
      show={modalActive}
      setBackColor = {setBackColor}
      setBackImage ={setBackImage}
      hide={()=>setModalActive(false)}
      />
      {/* : 
            <Link to="/auth/login"><span className="login">login</span></Link>
          } */}
    </div>
  );
};

export default Header;
