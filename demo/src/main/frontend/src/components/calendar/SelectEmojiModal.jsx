import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const SelectEmojiModal = (props) => {
  const { selectDate } = props;
  const [test, setTest] = useState("default");
  const [selectEmoji, setSelectEmoji] = useState();
  const [emojiId, setEmojiId] = useState();
  const [write, setWrite] = useState(false);

  const onSelectEmoji = (id)=>{
    console.log(id);
    setEmojiId(id);
  }

  useEffect(()=>{
    axios.get(`/emoji/${test}`)
    .then(res => {console.log(res); setSelectEmoji(res.data)})
    .catch(err => console.log(err))
  },[])

  return (
    <div>
      <Modal {...props} size="lg" centered id="selectEmojiModal">
        <Modal.Body >
          <h4 className="title">기분을 선택하세요.</h4>
          <div className="emojiWrap">
          {selectEmoji?.map((value)=>(
            <Link to='/board/write' state={{data: value.id, date: selectDate}}>
              <img src={value.emoji_image} onClick={()=>onSelectEmoji(value.id)}/>
            </Link>
          ))}
          </div>
          <Button onClick={props.onHide} className="closeButton">Close</Button>
        </Modal.Body>
      </Modal>
      {/* {write && <Link to="/board/write" ></Link>} */}
    </div>
  );
};

export default SelectEmojiModal;
