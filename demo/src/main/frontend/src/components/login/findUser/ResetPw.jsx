import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

const ResetPw = () => {
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [vibration, setVibration] = useState(false);
  const [checkPassword, setCheckPassword] = useState();

  const checkError = () => {
    setVibration(true);
    setTimeout(() => {
      setVibration(false);
    }, 300);
  };

  const password = (value) => {
    setCheckPassword(value);
  };

  const validatePassword = (value) => {
    if (value === checkPassword) {
      return true;
    } 
    return "비밀번호가 일치하지 않습니다.";
  };


  const onSubmit = () => {};

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
        <p className="pwCTitle"> 변경하실 비밀번호를 입력해주세요. </p>
        <input
          className="pwInput"
          placeholder="*********"
          type="password"
          {...register("user_password", {
            required: "(* 비밀번호는 필수 입력입니다.)",
            validate: password,
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
              message: "(* 비밀번호 형식에 맞지 않습니다.)",
            },
          })}
        />
        <p className="errorFont">* 최소 8자 이상 16자 이하로 입력해주세요.</p>
        <p className="errorFont">* 영문, 숫자를 혼용하여 입력해주세요.</p>
                      <p className={vibration ? "errorFont vibration" : "errorFont"}>
                {errors.user_password && (
                  <small role="alert">{errors.user_password.message}</small>
                )}
        </p>
        <p className="pwCTitle">비밀번호 확인</p>
              <input
                type="password"
                className="pwInput"
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
        <div className="closeButtonW mt1">
          <Button onClick={checkError} className="closeButton" type="onSubmit">
            보내기{" "}
          </Button>
          <Button  className="closeButton">
            닫기{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPw;
