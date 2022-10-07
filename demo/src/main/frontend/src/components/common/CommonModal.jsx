import React from 'react';
import { Modal, Button } from "react-bootstrap";

const CommonModal =(props)=> {
    const {show, hide, contents} =props;

        return (
            <div>
      <Modal size="lg" show={show} centered id="selectEmojiModal">
        <Modal.Body >
          <h4 className="title">{contents}</h4>
          <Button onClick={hide} href="/board/edit" className="closeButton">Close</Button>
        </Modal.Body>
      </Modal>
            </div>
        );
}

export default CommonModal;