import React from 'react';
import { Modal, Button } from "react-bootstrap";
import { Close, Minimize } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import './commonModal.scss';

const CommonModal =(props)=> {
    const {show, hide, contents, diary_id, state, url } =props;
    const navigate = useNavigate();

    const onClose =()=>{
      navigate(`/`);
    }

        return (
      <Modal size="lg" show={show} centered id="modalPage">
        <Modal.Body className='modalWrap'>
          <div className='title'>
          <span>{state}</span>
          <div className='headerButton'>
                    <div className='downB pixelBorder'> <Minimize/> </div>
                    <div className='downB pixelBorder' onClick={hide}> <Close/> </div>
          </div>
          </div>
          <div className='content'>{contents}</div>
          <div className='closeButtonW'>
          {diary_id ? <Button onClick={()=> navigate(`/board/read/${diary_id}`)} className="closeButton">Close</Button>:
          url === "login" ? <Button onClick={hide} className="closeButton pixelBorder">THANK YOU!</Button>
          : <Button onClick={()=>navigate('/')} className="closeButton pixelBorder">THANK YOU!</Button>
          }
           </div>
        </Modal.Body>
      </Modal>
        );
}

export default CommonModal;