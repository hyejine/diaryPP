import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Close, Minimize } from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";

const SelectEmojiModal = (props) => {
  const { selectDate, state, setClickEmoji, show, hide, currentUser } = props;
  const [selectEmoji, setSelectEmoji] = useState();
  const [emojiId, setEmojiId] = useState();
  const navigate = useNavigate();

  const onSelectEmoji = (id) => {
    console.log(id);
    setEmojiId(id);
    setClickEmoji(id);
  }
  useEffect(() => {
    axios.get(`/emoji/default`)
      .then(res => { setSelectEmoji(res.data)})
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <Modal show={show} size="lg" centered id="modalPage">
        <Modal.Body className="modalWrap imageM" style={currentUser?.font ? {fontFamily: `${currentUser.font}`} : {fontFamily:''}}>
          <div className='title'>
            <span>{state}</span>
            <div className='headerButton'>
              <div className='downB pixelBorder'> <Minimize /> </div>
              <div className='downB pixelBorder closeClick' onClick={hide}> <Close /> </div>
            </div>
          </div>
          <div className="emojiWrap">
            {selectEmoji?.map((value) => (
              <div>
                {selectDate ?
                  // <Link to='/board/write' state={{data: value.id, date: selectDate}}>
                  <Link to='/board/write' state={{data: value.id, date: selectDate}}>
                  <img src={value.emoji_image} alt="" key={value.id} >
                  </img>
                  </Link>
                  // </Link>
                  :
                  <img src={value.emoji_image} onClick={() => { onSelectEmoji(value.id); hide(); }} alt="" key={value.id} />
                }
              </div>
            ))}
          </div>
          <div className='closeButtonW'>
            <Button onClick={hide} className="closeButton pixelBorder">Close</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SelectEmojiModal;
