import React from "react";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import CheckBox from "../../resource/image/checkPixel.png";
import EmptyBox from "../../resource/image/emptyCheckBox.png";
import Check from "../../resource/image/check.png";
import CompletModal from "../common/CommonModal";

const ContactUs = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
    const [check, setCheck] = useState();
    const [modalActive, setModalActive] = useState();
    const [privateCheck, setPrivateCheck] = useState(false);
  
    const onSubmit = (value) => {
      console.log(value);
      console.log(check);

      if(check===undefined){
        console.log("들어오나", check);
        setPrivateCheck(true);
      }
      console.log(privateCheck);
    // value.preventDefault(value.target);
    // const data = {
    //     userEmail: value.target.userEmail.value,
    //     contactUs: value.target.opinionText.value
    // }

    // if (data.contactUs === ''|| data.userEmail === '' || !check){
    //   if(data.contactUs === ''|| data.userEmail === ''){
    //     // return <div>문의사항 또는 답변을 받으실 메일을 입력해주세요</div>
    //     alert("문의사항 또는 답변을 받으실 메일을 입력해주세요.");
    //   }
    //   if(!check){
    //     console.log(check);
    //     // return <div>문의사항 또는 답변을 받으실 메일을 입력해주세요</div>
    //     alert("개인정보 수집 및 이용에 동의해주세요.");
    //   }
    // } else if (data.userEmail !== ''){
    //   if(!Emailpattern.test(data.userEmail)){
    //     console.log("ff");
    //   } else {
    //     setModalActive(!modalActive);
    //   }
    // } 
    // else {
    //       // axios.post("/mail/postContactUs",data)
    // // .then((res)=> console.log(res))
    // // .catch((err)=>console.log(err))
    //   setModalActive(!modalActive);
    // }
  };
  const checkEvent = ()=>{
    setCheck(!check);
    setPrivateCheck(false);
  }

  return (
    <div className="contactUsTap pixelBorder">
      <div className="writeTitle">
        <img src={CheckBox} alt="" className="checkBox"></img>
        <span>의견보내기</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="writeAareaWrap">
          <textarea
            name="opinionText"
            className="writeAarea inputResize"
            placeholder="의견을 적어주세요! (´▽`ʃ💜ƪ)"
            {...register("contactUs", { required: "* 문의하실 내용을 입력해 주세요." })} 
          />
      <p className="errorFont"> {errors.contactUs && <small role="alert">{errors.contactUs.message}</small>}</p>
        </div>
        <div className="writeTitle mt2">
          <img src={CheckBox} alt="" className="checkBox"></img>
          <span>답변 받으실 이메일을 입력 해 주세요.</span>
        </div>
        <div className="writeAareaWrap">
        <input 
        className="writeAarea" placeholder="example@diyDiary.com"
        {...register("userEmail", { required: "* 이메일은 필수 입력입니다.",
      pattern: {
          value: /\S+@\S+\.\S+/,
          message: "* 이메일 형식에 맞지 않습니다.",
        },
      })} />
      <p className="errorFont"> {errors.userEmail && <small role="alert">{errors.userEmail.message}</small>}</p>
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
        <div className="writeAareaWrap">
        {privateCheck && <p className="errorFont -mt2">* 개인정보 수집 및 이용에 동의를 확인해주세요.</p>}
        </div>
          
        <div className="buttonWrap">
        <button type="submit" className="submitB pixelBorder">보내기</button>
        </div>
      </form>

      <CompletModal 
      state={'Success'}
      show={modalActive} 
      hide={()=>setModalActive(false)}
      contents = "🍀 좋은 의견 감사합니다 ."
      />
    </div>
  );
};

export default ContactUs;
