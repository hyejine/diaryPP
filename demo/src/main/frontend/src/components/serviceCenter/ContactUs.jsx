import React from "react";
import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import CheckBox from "../../resource/image/checkPixel.png";
import EmptyBox from "../../resource/image/emptyCheckBox.png";
import Check from "../../resource/image/check.png";
import CompletModal from "../common/CommonModal";

const ContactUs = () => {
    const [check, setCheck] = useState();
    const [modalActive, setModalActive] = useState();
    const Emailpattern = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$";
  
    const onSubmit = (value) => {
    value.preventDefault(value.target);
    const data = {
        useEmail: value.target.userEmail.value,
        contactUs: value.target.opinionText.value
    }

    if (data.contactUs === ''|| data.useEmail === '' || !check){
      if(data.contactUs === ''|| data.useEmail === ''){
        alert("문의사항 또는 답변을 받으실 메일을 입력해주세요.");
      }
      if(!check){
        console.log(check);
        alert("개인정보 수집 및 이용에 동의해주세요.");
      }
    } else {
          // axios.post("/mail/postContactUs",data)
    // .then((res)=> console.log(res))
    // .catch((err)=>console.log(err))
      setModalActive(!modalActive);
    }
    // if(Emailpattern.test(data.userEmail)){
    //   console.log("df");
    // }

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
          <span>개인정보 수집 및 이용에 동의합니다.</span>
          </sapn>
        </div>
        <div className="buttonWrap">
        <button type="submit" className="submitB pixelBorder">보내기</button>
        </div>
      </form>

      <CompletModal 
      show={modalActive} 
      hide={()=>setModalActive(false)}
      contents = "좋은 의견 감사합니다 ."
      />
    </div>
  );
};

export default ContactUs;
