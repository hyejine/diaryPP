import React, { useEffect, useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import { Close, Minimize } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import ResetPw from "./ResetPw";
import axios from "axios";

const FindUserModal = (props) => {
    const { show, hide, state } = props;
    const { resetField, register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange", defaultValues:{user_email : ""}});
    const [vibration, setVibration] = useState(false);
    const [ noId, setNoId ] = useState(false);
    const [ resetPw, setResetPw ] =useState();
    
    const checkError = () => {
        setVibration(true);
        setTimeout(() => {
            setVibration(false);
        }, 300);
    };

    const onSubmit = (value) => {
        console.log(value.user_email);
        axios.get(`/user/getId/${value.user_email}`)
        .then(res=> {
            console.log(res.data.length);
            if(res.data.length === 0){
                setNoId(true);
            } else{
                setResetPw(true);
            }
        })
        .cathch(err =>console.log(err))
    }

    const onResetV =()=>{
        resetField("user_email");
        hide(false);
        setNoId(false);
        setResetPw(false);
    }

    return (
        <Modal size="lg" show={show} centered id="modalPage" onHide={hide}>
            <Modal.Body className='modalWrap'>
            <div className='title'>
                    <span>{ resetPw ? "비밀번호 변경" : state }</span>
                    <div className='headerButton'>
                        <div className='downB pixelBorder'> <Minimize /> </div>
                        <div className='downB pixelBorder closeClick' onClick={onResetV}> <Close /> </div>
                    </div>
                </div>
                <div className='pwContent'>
                {resetPw ? <ResetPw/> : 
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className='pwCTitle'>회원가입 때 입력하신 이메일을 입력해주세요.</p>
                        <input className='pwInput' placeholder='example@diyDiary.com'
                            {...register("user_email", {
                                required: "(* 이메일은 필수 입력입니다.)",
                                pattern: {
                                    value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "(* 이메일 형식에 맞지 않습니다.)",
                                },
                            })}
                        />
                        <p className={vibration ? "errorFont vibration" : "errorFont"}>
                            {errors.user_email && (<small role="alert">{errors.user_email.message}</small>)}
                        </p>
                        {noId && <p className='errorFont'>(* 존재하지 않는 이메일입니다.)</p>}
                        <div className='closeButtonW mt1'>
                            <Button onClick={checkError} className="closeButton" type='onSubmit'> 보내기 </Button>
                            <Button onClick={onResetV} className="closeButton"> 닫기 </Button>
                        </div>
                    </form>
                }
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default FindUserModal;
