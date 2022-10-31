import React from "react";
import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import CheckBox from "../../resource/image/checkPixel.png";
import EmptyBox from "../../resource/image/emptyCheckBox.png";
import Check from "../../resource/image/check.png";

const ContactUs = () => {
    const [check, setCheck] = useState();
  
    const onSubmit = (value) => {
    value.preventDefault(value.target);
    const data = {
        useEmail: value.target.userEmail.value,
        contactUs: value.target.opinionText.value
    }
    axios.post("/mail/postContactUs",data)
    .then((res)=> console.log(res))
    .catch((err)=>console.log(err))
  };

  const checkEvent = ()=>{
    setCheck(!check);
  }

  return (
    <div className="contactUsTap pixelBorder">
      <div className="writeTitle">
        <img src={CheckBox} alt="" className="checkBox"></img>
        <span>의견보내기</span>
      </div>
      <form onSubmit={onSubmit}>
        <div className="writeAareaWrap">
          <textarea
            name="opinionText"
            className="writeAarea inputResize"
            placeholder="의견을 적어주세요! (´▽`ʃ💜ƪ)"
          />
        </div>
        <div className="writeTitle mt2">
          <img src={CheckBox} alt="" className="checkBox"></img>
          <span>답변 받으실 이메일을 입력 해 주세요.</span>
        </div>
        <div className="writeAareaWrap">
          <input name="userEmail" className="writeAarea" placeholder="example@diyDiary.com"/>
        </div>
        <div className="writeTitle mt2"  >
         <sapn className="setCursor writeTitle" onClick={checkEvent}>
            <div className="onCheckEvent">
          <img  src={EmptyBox} alt="" className="checkBox"/>
          {check && <img  src={Check} alt="" className="checkPoint"/>}
          </div>
          <span>개인정보 방치에 동의합니다.</span>
          </sapn>
        </div>
        <div className="buttonWrap">
        <button type="submit" className="submitB pixelBorder">보내기</button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
