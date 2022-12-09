import React, { useEffect, useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import { Close, Minimize } from "@mui/icons-material";
import { useForm } from "react-hook-form";

const FindUserModal = (props) => {
    const { show, hide, state } = props;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [vibration, setVibration] = useState(false);
    const [value, setValue] = useState();
    
    const checkError = () => {
        setVibration(true);
        setTimeout(() => {
            setVibration(false);
        }, 300);
    };

    const onSubmit = (value) => {
        console.log(value);
    }

    useEffect(()=>{
        if(hide){
            console.log("dfd");
        }

    },[hide])

    return (
        <Modal size="lg" show={show} centered id="modalPage" onHide={hide}>
            <Modal.Body className='modalWrap'>
                <div className='title'>
                    <span>{state}</span>
                    <div className='headerButton'>
                        <div className='downB pixelBorder'> <Minimize /> </div>
                        <div className='downB pixelBorder closeClick' onClick={hide}> <Close /> </div>
                    </div>
                </div>
                <div className='pwContent'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className='pwCTitle'>회원가입 때 입력하신 이메일을 입력해주세요.</p>
                        <input className='pwInput' placeholder='example@diyDiary.com' value={value} onChange={(v)=>{setValue(v)}}
                            {...register("user_email", {
                                required: "(*이메일은 필수 입력입니다.)",
                                pattern: {
                                    value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "(* 이메일 형식에 맞지 않습니다.)",
                                },
                            })}
                        />
                        <p className={vibration ? "errorFont vibration" : "errorFont"}>
                            {errors.user_email && (<small role="alert">{errors.user_email.message}</small>)}
                        </p>
                        <div className='closeButtonW mt1'>
                            <Button onClick={checkError} className="closeButton" type='onSubmit'> 보내기 </Button>
                            <Button onClick={hide} className="closeButton"> 닫기 </Button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default FindUserModal;
