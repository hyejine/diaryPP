import React, { useState } from 'react';
import { useEffect } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { Close, Minimize } from "@mui/icons-material";
import BackgroundSave from "../../common/CommonModal";
import { useDispatch } from "react-redux";
import { setCustom, userCustom } from "../../../reducer/userSlice";
import axios from "axios";
import '../../common/commonModal.scss'

const BackgroundModal = (props) => {
  const { show, hide, setBackColor, setBackImage, state, currentUser, fontChange, userCustom } = props;
  const [modalActive, setModalActive] = useState();
  const dispatch = useDispatch();
  const onSubmit = (value) => {
    // console.log(value.target.backColor.value);
    // hide();
    console.log("dff");
    setModalActive(true);
  }
  console.log(userCustom)
  const onChangeColor = (value) => {
    const data = {
      font: userCustom.font,
      backColor: value.target.value,
      backImage: undefined
    }
    dispatch(setCustom(data));
    // setBackColor(value.target.value);
    // setBackImage(undefined);
  }
  const onChangePic = (value) => {

    const file = value.target.files;
    const formData = new FormData();

    if (file) { // 파일이 있다면 폼 데이터에 추가 
      formData.append("multipartFiles", file[0]);
      console.log(file);
      console.log(value.files);
    }

    // file 데이터 담아서 서버에 전달하여 이미지 업로드
    axios.post('/board/register/imageUpload', formData)
      .then(res => {
        console.log(res.data);
        const data = {
          font: userCustom.font,
          backColor: undefined,
          backImage: res.data
        }
        dispatch(setCustom(data));
        // setBackImage(res.data);
        // setBackColor(undefined);
      })
      .catch(err => console.log(err));
  }

  return (
    <Modal show={show} size="lg" centered id="modalPage" onHide={hide}>
      <Modal.Body className='modalWrap' style={{ fontFamily: `${fontChange}` }}>
        <div className='title'>
          <span>{state}</span>
          <div className='headerButton'>
            <div className='downB pixelBorder'> <Minimize /> </div>
            <div className='downB pixelBorder closeClick'> <Close onClick={hide} /> </div>
          </div>
        </div>
        <div className="bgcontent">
          <Form>
            <Form.Group controlId="formFileMultiple">
              <span className='controlTitle'>사진 업로드</span>
              <Form.Control type="file" multiple onChange={onChangePic} className="controlContent bgPic" accept='image/*' />
            </Form.Group>
            <span className='controlTitle'>색상 선택</span>
            <Form.Control type="color" id="backColor" defaultValue="#fde5f3" title="Choose your color" onChange={onChangeColor} className="controlContent" />
            <div className='closeBDiv'>
              <Button className="closeButton" onClick={onSubmit}>저장</Button>
              <Button onClick={hide} className="closeButton">닫기</Button>
            </div>
          </Form>
        </div>
      </Modal.Body>
      <BackgroundSave
        fontChange={fontChange}
        show={modalActive}
        state={'Success'}
        contents={"🍀 저장되었습니다."}
        hide={hide}
      />
    </Modal>
  );
};

export default BackgroundModal;