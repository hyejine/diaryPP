import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const SelectEmojiModal = (props) => {
  const { selectDate, clickEmoji, setClickEmoji, show, hide} = props;
  const [test, setTest] = useState("default");
  const [selectEmoji, setSelectEmoji] = useState();
  const [emojiId, setEmojiId] = useState();
  const [write, setWrite] = useState(false);

  
  const onSelectEmoji = (id)=>{
    setEmojiId(id);
    console.log(id);
    setClickEmoji(id);
  }
console.log(show);
  // console.log(selectDate);
  // console.log(clickEmoji);
  // console.log(setClickEmoji);
  useEffect(()=>{
    axios.get(`/emoji/${test}`)
    .then(res => {setSelectEmoji(res.data)})
    .catch(err => console.log(err))
  },[])

  return (
    <div>
      <Modal show = {show} size="lg" centered id="selectEmojiModal">
        <Modal.Body >
          <h4 className="title">기분을 선택하세요.</h4>
          <div className="emojiWrap">
          {selectEmoji?.map((value)=>(
            <div>
            {selectDate ? 
            <Link to='/board/write' state={{data: value.id, date: selectDate}}>
              <img src={value.emoji_image} onClick={()=>onSelectEmoji(value.id)} alt="" key ={value.id}/>
            </Link> : 
            <img src={value.emoji_image} onClick={()=>{onSelectEmoji(value.id); hide();}} alt="" key ={value.id}/>
            }
            </div>
          ))}
          </div>
          <Button onClick={hide} className="closeButton">Close</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SelectEmojiModal;
