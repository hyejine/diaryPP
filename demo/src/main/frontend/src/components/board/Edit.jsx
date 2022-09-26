import React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
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

  return (
    <div className="boardPage">
      <div className="boardScroll">
      <div >
      {board?.map((value) => (
        <div className="editPage">
          <div className="dateDiv">
            <span className="date"> {value.diary_date} </span>
            <span>
              <img src={value.emoji_image_id} className="emojiImage" alt="" />
            </span>
          </div>
          <div className="title">
          {value.diary_title}
          </div>
          <div className="editContent" dangerouslySetInnerHTML={{ __html: value.diary_content }} />
          <div className="sendButtonWrap2">
          <Button className="sendButton">수정</Button>
          <Button className="sendButton">삭제</Button>
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
