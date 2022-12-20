import React, { useState } from 'react';
import { useEffect } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { Close, Minimize } from "@mui/icons-material";
import BackgroundSave from "../../common/CommonModal";

import axios from "axios";
import '../../common/commonModal.scss'

const BackgroundModal = (props) => {
  const { show, hide, setBackColor, setBackImage, state, currentUser } = props;
  const [modalActive, setModalActive] =useState();

  const onSubmit = (value) => {
    // console.log(value.target.backColor.value);
    // hide();
    console.log("dff");
    setModalActive(true);
  }
  const onChangeColor = (value) => {
    setBackColor(value.target.value);
    setBackImage(undefined);
  }
  const onChangePic = (value) => {
    // input file tag 생성
    const input = document.createElement("input");
    input.setAttribute("type", "file");   // input type을 file로 바꾼다. 
    input.setAttribute("accept", "image/*");   // input에 허용되는 파일 
    input.click();

    input.onchange = async () => {
      const file = input.files;
      const formData = new FormData();

      if (file) { // 파일이 있다면 폼 데이터에 추가 
        formData.append("multipartFiles", file[0]);
      }

      // file 데이터 담아서 서버에 전달하여 이미지 업로드
      const res = await axios.post('/board/register/imageUpload', formData);
      console.log(res.data);
      setBackImage(res.data);
      setBackColor(undefined);
    }
  }

  return (
    // <div style={{ background : `url("http://localhost:8080/board/getImage/16659625281776251/jpg")`  }}>
    <Modal show={show} size="lg" centered id="modalPage" onHide={hide}>
      <Modal.Body className='modalWrap' style={currentUser?.font ? {fontFamily: `${currentUser.font}`} : {fontFamily:'DungGeunMo'}}>
        <div className='title'>
          <span>{state}</span>
          <div className='headerButton'>
            <div className='downB pixelBorder'> <Minimize /> </div>
            <div className='downB pixelBorder closeClick'> <Close onClick={hide}/> </div>
          </div> 
        </div>
        <div className="bgcontent">
          <Form>
            <Form.Group controlId="formFileMultiple">
              <span className='controlTitle'>사진 업로드</span>
              <Form.Control type="file" multiple onChange={onChangePic} className="controlContent bgPic" />
            </Form.Group>
            <span className='controlTitle'>색상 선택</span>
            <Form.Control type="color" id="backColor" defaultValue="#fde5f3" title="Choose your color" onChange={onChangeColor}  className="controlContent"/>
            <div className='closeBDiv'>
            <Button className="closeButton" onClick={onSubmit}>저장</Button>
            <Button onClick={hide} className="closeButton">닫기</Button>
            </div>
          </Form>
        </div>
      </Modal.Body>
      <BackgroundSave
      show ={modalActive}
      state={'Success'}
      contents ={"🍀 저장되었습니다."}
      hide={hide}
      />
    </Modal>
  );
};

export default BackgroundModal;