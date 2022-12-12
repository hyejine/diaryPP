import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import CompletModal from "../../common/CommonModal";
import './regist.scss';

const Regist = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [vaild, setVaild] = useState();
  const [vibration, setVibration] = useState(false);
  const [modalActive, setModalActive] = useState();
  const [checkPassword, setCheckPassword] = useState();

  const onSubmit = (value) => {
    console.log(value);
    axios
      .post("/auth/signUp", value)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

    setModalActive(true);
  };

  const checkError = () => {
    setVibration(true);
    setTimeout(() => {
      setVibration(false);
    }, 300);
  };

  const idCheck = (value) => {
    axios
      .get(`/user/getId/${value}`)
      .then((res) => {
        if (res.data.length === 0) {
          console.log(res);
          setVaild(true);
          console.log(vaild);
          onIdError();
        } else {
          setVaild(false);
          console.log(vaild);
          onIdError();
          // if (vaild !== true) {
          //   return "이미 가입된 아이디 입니다.";
          // }
        }

        console.log(vaild)
      })
      .catch((err) => {setVaild(false); onIdError(); console.log(err);});

    console.log(vaild);
    // if (vaild !== true) {
    //   return "이미 가입된 아이디 입니다.";
    // } 
    // if (vaild !== true) {
    //   return "이미 가입된 아이디 입니다.";
    // } 
    // else if (vaild === "undefind"){
    //   return false;
    // }
    // return true;
  };
const onIdError =()=>{
  if(vaild){
    console.log("ㅇㄻㄹㄹㄴㅇ");
  }else {
    return "이미 가입된 아이디 입니다.";
  }
  console.log(vaild);
}

  const password = (value) => {
    setCheckPassword(value);
  };

  const validatePassword = (value) => {
    if (value === checkPassword) {
      return true;
    }
    return "비밀번호가 일치하지 않습니다.";
  };

  return (
    <div className="registPage">
      <div className="regist_inner">
        <div className="regist_title">
          <p className="title1">환영합니다!</p>
          <p className="title2">항목을 채워 주세요!</p>
        </div>
        <div className="regist_input">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="writeTitle">
              <span>닉네임</span>
            </div>
            <div className="writeAareaWrap">
              <input
                className="writeAarea"
                placeholder="홍길동"
                {...register("user_name", {
                  required: "(* 닉네임은 필수 입력입니다.)",
                })}
              />
              <p className={vibration ? "errorFont vibration" : "errorFont"}>
                {errors.user_name && (
                  <small role="alert">{errors.user_name.message}</small>
                )}
              </p>
            </div>
            <div className="writeTitle">
              <span>이메일</span>
            </div>
            <div className="writeAareaWrap">
              <input
                className="writeAarea"
                placeholder="example@diyDiary.com"
                {...register("user_email", {
                  required: "(*이메일은 필수 입력입니다.)",
                  validate: idCheck,
                  pattern: {
                    value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "(* 이메일 형식에 맞지 않습니다.)",
                  },
                })}
              />
              {vaild && <p className="validFont"> 가입이 가능한 아이디 입니다. </p>}
              <p className={vibration ? "errorFont vibration" : "errorFont"}>
                {errors.user_email && (
                  <small role="alert">{errors.user_email.message}</small>
                )}
              </p>
            </div>
            <div className="writeTitle">
              <span>비밀번호</span>
            </div>
            <div className="writeAareaWrap">
              <input
                type="password"
                className="writeAarea"
                placeholder="*********"
                {...register("user_password", {
                  required: "(* 비밀번호는 필수 입력입니다.)",
                  validate: password,
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
                    message: "(* 비밀번호 형식에 맞지 않습니다.)",
                  },
                })}
              />
              <p className="errorFont">
                * 최소 8자 이상 16자 이하로 입력해주세요.
              </p>
              <p className="errorFont">
                * 영문, 숫자를 혼용하여 입력해주세요.
              </p>
              <p className={vibration ? "errorFont vibration" : "errorFont"}>
                {errors.user_password && (
                  <small role="alert">{errors.user_password.message}</small>
                )}
              </p>
            </div>
            <div className="writeTitle">
              <span>비밀번호 확인</span>
            </div>
            <div className="writeAareaWrap">
              <input
                type="password"
                className="writeAarea"
                placeholder="*********"
                {...register("rePassword", {
                  required: "(* 비밀번호는 필수 입력입니다.)",
                  validate: validatePassword,
                })}
              />
              <p className={vibration ? "errorFont vibration" : "errorFont"}>
                {errors.rePassword && (
                  <small role="alert">{errors.rePassword.message}</small>
                )}
              </p>
            </div>
            <div className="buttonWrap">
              <button
                type="submit"
                className="submitB pixelBorder"
                onClick={checkError}>
                가입하기!
              </button>
            </div>
          </form>
        </div>
      </div>
      <CompletModal
        state={"Success"}
        show={modalActive}
        hide={() => setModalActive(false)}
        contents="🌻 환영합니다. 🌻"
      />
    </div>
  );
};

export default Regist;
