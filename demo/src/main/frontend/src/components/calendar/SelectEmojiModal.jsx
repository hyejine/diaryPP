import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

const SelectEmojiModal = (props) => {
  return (
    <div>
      <Modal {...props} size="lg" centered >
      <Modal.Header closeButton>
      </Modal.Header>
        {/* <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body >
          <h4 className="selectEmoji">Centered Modal</h4>
          <p className="selectEmoji">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Body>
        {/* <Modal.Footer>
        </Modal.Footer> */}
      </Modal>
      <h4 className="selectEmoji">Centered Modal</h4>
    </div>
  );
};

export default SelectEmojiModal;
