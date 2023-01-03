import React, { useState } from 'react';
import { useEffect } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const BackgroundModal = (props) => {
    const {show, hide, setBackColor, setBackImage, currentUser} = props;

    const onSubmit =(value)=>{
        value.preventDefault();
        console.log(value.target.backColor.value);
        hide();
    }
    const onChangeColor = (value)=>{
        setBackColor(value.target.value);
        setBackImage(undefined);
    }
    const onChangePic = (value) =>{
         // input file tag 생성
      const input = document.createElement("input");
      input.setAttribute("type", "file");   // input type을 file로 바꾼다. 
      input.setAttribute("accept", "image/*");   // input에 허용되는 파일 
      input.click();
        
        input.onchange = async () => {
          const file = input.files;
          const formData = new FormData();
      
          if(file) { // 파일이 있다면 폼 데이터에 추가 
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
        <div >
            {/* <img src='http://localhost:8080/board/getImage/16659625281776251/jpg' alt=''></img> */}
    <Modal show = {show} size="lg" centered style={currentUser?.font ? {fontFamily: `${currentUser.font}`} : {fontFamily:''}}>
        <Modal.Body >
          <h4 className="">사이트를 꾸며보세요!</h4>
          <Form onSubmit={onSubmit}>
          <div className="">
          <Form.Group controlId="formFileMultiple">
        <Form.Control type="file" multiple onChange={onChangePic}/>
      </Form.Group>
            <span>사진 업로드</span>
            <span>색상 선택</span>
            <Form.Control
        type="color"
        id="backColor"
        defaultValue="#ffc700"
        title="Choose your color"
        onChange={onChangeColor}

      />
          </div>
          <Button className="closeButton" type="submit">OK</Button>
          </Form>
          <Button onClick={hide} className="closeButton">Close</Button>
        </Modal.Body>
      </Modal>  
        </div>
    );
};

export default BackgroundModal;