import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import { Button, Menu, MenuItem } from "@mui/material";
import { HelpCenter, AccountCircle, KeyboardArrowDown } from "@mui/icons-material";
import { useState } from "react";
import logo from '../../../resource/image/logo.png'
import BackgroundModal from "../../userCustom/BackgroundModal";

const Header = (props) => {
  const { currnetUser, setBackColor, setBackImage, setFontChange } = props;
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
  
  const fontStyle = [
    { value : "Galmuri9" , fontStyle : "갈무리"},
    { value : "GangwonEdu_OTFBoldA" , fontStyle : "강원교육모두체"},
    { value : "GowunDodum-Regular" , fontStyle : "고운돋움"},
    { value : "EF_Diary" , fontStyle : "다이어리체"},
    { value : "DungGeunMo" , fontStyle : "둥근모꼴"},
    { value : "SDMiSaeng" , fontStyle : "미생체"},
    { value : "Cafe24Oneprettynight" , fontStyle : "카페24 고운밤"},
    { value : "GmarketSansMedium" , fontStyle : "Gmarket Sans"},
    { value : "IBMPlexSansKR-Regular" , fontStyle : "IBM Plex Sans"},
    { value : "IM_Hyemin-Bold" , fontStyle : "IM혜민체"},
    { value : "KoPubWorld_Dotum" , fontStyle : "KoPub돋움"},
    { value : "KoPubWorld_Batang" , fontStyle : "KoPub바탕"},
  ];

  const chageFont = (value)=>{
    setFontChange(value.target.value);
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
        <Menu anchorEl={setting} open={openSeting} onClose={handleClose} className="menuWrap">
          <MenuItem disableRipple>Language</MenuItem>
          <select onChange ={(s)=>{chageFont(s)}} defaultValue="글꼴선택" className="menuFont">
            <option value="fontSelect" className="menuFont"> 글꼴선택 </option> 
            {fontStyle?.map((v) => (
            <option value={v.value} key={v.fontStyle} style={{fontFamily: `${v.value}` }}> {v.fontStyle} </option> 
            ))}
        </select>
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
