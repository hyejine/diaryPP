import React from 'react';
import { Modal, Button } from "react-bootstrap";

const CommonModal =(props)=> {
    const {modalActive, setModalActive} =props;

        return (
            <div>
      <Modal size="lg" show={modalActive} centered id="selectEmojiModal">
        <Modal.Body >
          <h4 className="title">작성하신 글이 등록 되었습니다.</h4>
          <Button onClick={()=>setModalActive(false)} href="/board/edit" className="closeButton">Close</Button>
        </Modal.Body>
      </Modal>
            </div>
        );
}

export default CommonModal;