import React from 'react';
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CommonModal =(props)=> {
    const {show, hide, contents, diary_id} =props;
    const navigate = useNavigate();

        return (
            <div>
      <Modal size="lg" show={show} centered id="selectEmojiModal">
        <Modal.Body >
          <h4 className="title">{contents}</h4>
          <Button onClick={()=> navigate(`/board/read/${diary_id}`)} className="closeButton">Close</Button>
        </Modal.Body>
      </Modal>
            </div>
        );
}

export default CommonModal;