import React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { localDateRenderer } from "../../utils/index";
import axios from "axios";
import "./write.scss";

const Edit = () => {
  const [board, setBoard] = useState();

  useEffect(() => {
    axios
      .get(`/board/getBoard`)
      .then((res) => {
        console.log(res.data);
        setBoard(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onDelete =(value)=>{
    console.log(value);
    axios
      .get(`/board/deleteBoard`)
      .then((res) => {
        console.log(res.data);
        setBoard(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="boardPage">
      <div className="boardScroll">
      <div >
      {board?.map((value) => (
        <div className="editPage">
          <div className="dateDiv">
            <span className="date"> {localDateRenderer(value.diary_date)}</span>
            <span>
              <img src={value.emoji_image_id[0].emoji_image} className="emojiImage" alt="" />
            </span>
          </div>
          <div className="title">
          {value.diary_title}
          </div>
          <div className="editContent" dangerouslySetInnerHTML={{ __html: value.diary_content }} />
          <div className="sendButtonWrap2">
          <Button className="sendButton" >수정</Button>
          <Button className="sendButton" onClick={()=>onDelete(value.id)}>삭제</Button>
          <Button className="sendButton">내보내기</Button>
          </div>

        </div>
      ))}
      </div>
      </div>
    </div>
  );
};

export default Edit;
