import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import BackgroundModal from "../../header/modal/BackgroundModal";
import { Dropdown, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../reducer/userLogin";
import FontModal from "../../common/CommonModal";
import { loginUser } from "../../../reducer/userLogin";

import { useTranslation } from 'react-i18next'
import i18n from "i18next";

import "./header.scss";
import axios from "axios";

const Header = (props) => {
  const { currentUser, setBackColor, setBackImage, setFontChange, fontChange } = props;
  const [modalActive, setModalActive] = useState(false);
  const [fontModal, setFontModal] = useState(false);
  const dispatch = useDispatch();

  const { t }  = useTranslation(['common'])
    
  const onLanguageC = (v) => {
    i18n.changeLanguage(v.target.value)
  }

  const onBackgroundChg = () => {
    setModalActive(!modalActive);
  };
  console.log("Header: ", fontChange, currentUser);

  const fontStyle = [
    { value: "Galmuri9", fontStyle: "갈무리" },
    { value: "GangwonEdu_OTFBoldA", fontStyle: "강원교육모두체" },
    { value: "GowunDodum-Regular", fontStyle: "고운돋움" },
    { value: "EF_Diary", fontStyle: "다이어리체" },
    { value: "DungGeunMo", fontStyle: "둥근모꼴" },
    { value: "SDMiSaeng", fontStyle: "미생체" },
    { value: "Cafe24Oneprettynight", fontStyle: "카페24 고운밤" },
    { value: "GmarketSansMedium", fontStyle: "Gmarket Sans" },
    { value: "IBMPlexSansKR-Regular", fontStyle: "IBM Plex Sans" },
    { value: "IM_Hyemin-Bold", fontStyle: "IM혜민체" },
    { value: "KoPubWorld_Dotum", fontStyle: "KoPub돋움" },
    { value: "KoPubWorld_Batang", fontStyle: "KoPub바탕" },
  ];

  const chageFont = (value) => {
    setFontChange(value.target.value);
  };

  const saveFont = () => {
    const data = {
      user_email: currentUser.email,
      custom_font: fontChange,
      custom_id : currentUser.id,
      custom_name : currentUser.name
    };
    axios
      .post(`/custom/postFont`, data)
      .then((res) => {
        console.log(res);
        setFontModal(true);
        dispatch(loginUser(data));
      })
      .catch((err) => {console.log(err);
        setFontModal(false);
      });
  };

  const onLogout =()=> {
    console.log(currentUser);
    dispatch(clearUser(currentUser));
  }
  const [test, setTest] = useState(false);

  const clickDropdown = ()=>{
    setTest(!test);
  }
  // window.close(dispatch(clearUser(currentUser)));
  console.log(currentUser);

  return (
    <div className="header" >
      <Link to="/">
        <span className="logo">D,I,Y Diary</span>
      </Link>
      <div className="menuWrap">
      <div className="customMenu">
      {currentUser?.email ? 
        <Dropdown autoClose="outside">
          <Dropdown.Toggle className="dropdownTitle">
            <span>
              {currentUser?.image ? currentUser?.image : <AccountCircle/>} <span className="userName">{currentUser?.name}</span>
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ width: 263 }} className="dropdownMenu">
            <Dropdown.Item>
              <span> Language </span>
              <div style={{ display: "flex" }} className="dropdownSelect">
                <Form.Select className="menuFont" onChange={(v)=>onLanguageC(v)}>
                  <option value="fontSelect" className="menuFont">
                    언어선택
                  </option>
                  <option value="ko" className="menuFont">
                    Korea
                  </option>
                  <option value="en" className="menuFont">
                    Engilsh
                  </option>
                  <option value="jp" className="menuFont">
                    Japan
                  </option>
                </Form.Select>
              </div>
            </Dropdown.Item>
            <Dropdown.Item>
              <span> Font </span>
              <div style={{ display: "flex" }} className="dropdownSelect">
                <Form.Select
                  onChange={(s) => {
                    chageFont(s);
                  }}
                  className="menuFont"
                >
                  <option value="fontSelect" className="menuFont">
                    글꼴선택                  </option>
                  {fontStyle?.map((v) => (
                    <option
                      value={v.value}
                      key={v.fontStyle}
                      style={{ fontFamily: `${v.value}` }}
                    >
                      {v.fontStyle}                    </option>
                  ))}
                </Form.Select>
                <button className="fontB" onClick={saveFont}>
                  저장{" "}
                </button>
              </div>
            </Dropdown.Item>
            <Dropdown.Item onClick={onBackgroundChg} className="dropdownSelect">
              Background Color
            </Dropdown.Item>
            <Dropdown.Item onClick={onLogout} className="dropdownSelect"> Logout </Dropdown.Item>
            {/* <Button
              variant="contained"
              color="success"
              href="/emoji"
              className="emojiButton"
            >
              프리미엄 이모지 보러가기
            </Button> */}
          </Dropdown.Menu>
        </Dropdown>
        : <div className="login"><Link to="/user/login">Login</Link></div>}  
        </div>
        <div>
        <Dropdown autoClose="outside">
          <Dropdown.Toggle href="/ContactUs" >
            <span>고객센터</span>
          </Dropdown.Toggle>
        </Dropdown>
      </div>
      </div>
      <FontModal
       show={fontModal}
       state={'Success'}
       contents ={"🍀 저장되었습니다."}
       hide={() => setFontModal(false)}
       />
      <BackgroundModal
        show={modalActive}
        state={'Change BackGround'}
        setBackColor={setBackColor}
        setBackImage={setBackImage}
        hide={() => setModalActive(false)}
      />
    </div>
  );
};

export default Header;
