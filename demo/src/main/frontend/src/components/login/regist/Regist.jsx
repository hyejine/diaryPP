import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import CompletModal from "../../common/CommonModal";

const Regist = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [userId, setUserId] = useState();
  const [vaild, setVaild] = useState(false);
  const [vibration, setVibration] = useState(false);
  const [modalActive, setModalActive] = useState();
  const [checkPassword, setCheckPassword] = useState();

  const onSubmit = (value) => {
    console.log(value);
    axios.post('/user/signUp',value)
    .then(response => console.log(response))
    .catch(error => console.log(error))

    setModalActive(true);
  };

  const onChangeValue = (event)=>{
    setUserId(event.target.value);
  }
  
  const checkId = ()=>{
    axios.get(`/user/getId/${userId}`)
    .then(response => { if(response.data.length < 1){
      setVaild(!vaild);
     }})
    .catch(error => console.log(error))
  }
  const checkError = ()=>{
    setVibration(true)
    setTimeout(()=>{ setVibration(false) }, 2000);
  }

  const password = (value)=>{
    setCheckPassword(value);
    console.log(value);
  }
  const validatePassword = (value) =>{
    if(value=== checkPassword){
      return true
    }
    return "비밀번호가 일치하지 않습니다."
  }
  return (
    <div className="login_wrap">
      <div className="login_inner">
        <p className="title1 text_center">환영합니다!💖</p>
        <p className="title2 text_center">항목을 채워 주세요!</p>
        <div className="login_input">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="writeTitle mt2">
          <span>닉네임</span>
        </div>
        <div className="writeAareaWrap">
        <input 
        className="writeAarea" placeholder="홍길동"
        {...register("user_name", { required: "(* 닉네임은 필수 입력입니다.)"
      })} />
      <p className={vibration ? "errorFont vibration" : "errorFont"}> {errors.user_name && <small role="alert">{errors.user_name.message}</small>}</p>
      </div>
      <div className="writeTitle mt2">
          <span>이메일</span>
        </div>
        <div className="writeAareaWrap">
        <input 
        className="writeAarea" placeholder="example@diyDiary.com"
        {...register("user_email", { required: "(*이메일은 필수 입력입니다.)",
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "(* 이메일 형식에 맞지 않습니다.)",
        },
      })} />
            <p className={vibration ? "errorFont vibration" : "errorFont"}> {errors.user_email && <small role="alert">{errors.user_email.message}</small>}</p>
      </div>
      <div className="writeTitle mt2">
          <span>비밀번호</span>
        </div>
        <div className="writeAareaWrap">
        <input 
         type="password"
        className="writeAarea" placeholder="*********"
        {...register("user_password", { required: "(* 비밀번호는 필수 입력입니다.)",
        validate: password,
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
          message: "(* 비밀번호 형식에 맞지 않습니다.)",
        },
      })} />
      <p>비밀번호는 최소 8자 이상 16자 이하로 영문, 숫자를 혼용하여 입력해주세요.</p>
            <p className={vibration ? "errorFont vibration" : "errorFont"}> {errors.user_password && <small role="alert">{errors.user_password.message}</small>}</p>
      </div>
      <div className="writeTitle mt2">
          <span>비밀번호 확인</span>
        </div>
        <div className="writeAareaWrap">
        <input 
                type="password"
        className="writeAarea" placeholder="*********"
        {...register("rePassword", { required: "(* 비밀번호는 필수 입력입니다.)",
        validate: validatePassword
      })} />
       <p className={vibration ? "errorFont vibration" : "errorFont"}> {errors.rePassword && <small role="alert">{errors.rePassword.message}</small>}</p>
      </div>
      <div className="buttonWrap">
        <button type="submit" className="submitB pixelBorder" onClick={checkError}>보내기</button>
        </div>
        {/* <Form.Group controlId="name">
        <Form.Label>name</Form.Label>
        <Form.Control type="text" required />
        <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email </Form.Label>
        <Form.Control type="email" required onChange={onChangeValue}/>
        <Button onClick={checkId}>중복확인</Button>
        {vaild ? <p>이미 가입된 아이디 입니다. </p> : <p> 가입이 가능한 아이디 입니다. </p>}
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" required/>
      </Form.Group>
      <Form.Group  controlId="rePassword">
      <Form.Label>Re-Enter Password</Form.Label>
        <Form.Control type="password" required/>
      </Form.Group>
      <div className="login_button">
      <Button className="login_b" type="submit">
        Submit
      </Button>
      </div> */}
    </form>
    </div>
      </div>
      <CompletModal 
      state={'Success'}
      show={modalActive} 
      hide={()=>setModalActive(false)}
      contents = "🌻 환영합니다. 🌻"
      />
    </div>
  );
};

export default Regist;
