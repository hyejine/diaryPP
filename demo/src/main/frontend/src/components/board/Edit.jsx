import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { localDateRenderer } from "../../utils/index";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import axios from "axios";
import "./write.scss";

const Edit = () => {
  const location = useLocation();
  const calendarId = location.state.calendarId;
  const [board, setBoard] = useState();

  const refs = useRef([]);

  useEffect(() => {
    axios
    .get(`/board/getMonthBoard`)
    .then((res) => {
      setBoard(res.data);
      refs.current[calendarId].scrollIntoView({ block: 'center' });
    })
    .catch((err) => console.log(err));
  }, []);
  
  const onDelete =(id)=>{
    console.log(id);
    axios.delete(`/board/deleteBoard/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  const onEdit =(id)=>{
    console.log(id);
  }

  const onDownload = () =>{
    domtoimage
    .toBlob(document.querySelector('.boardPage'), 
    )
    .then((blob) => {
      saveAs(blob, 'diary.png');
    });
  }

  return (
    <div className="boardPage">
      <div className="boardScroll">
      <div>
      {board?.map((value) => (
        <div className="editPage"  key ={value.diary_id} ref={(el) => (refs.current[value.diary_id] = el) }>
          <div className="dateDiv">
            <span className="date"> {localDateRenderer(value.diary_date)}</span>
            <span>
              <img src={value.emojiImageDto.emoji_image} className="emojiImage" alt="" />
            </span>
          </div>
          <div className="title">
          {value.diary_title}
          </div>
          <div className="editContent" dangerouslySetInnerHTML={{ __html: value.diary_content }} />
          <div className="sendButtonWrap2">
          <Button className="sendButton" onClick={()=>onEdit(value.diary_id)}>수정</Button>
          <Button className="sendButton" onClick={()=>onDelete(value.diary_id)}>삭제</Button>
          <Button className="sendButton" onClick={onDownload}>캡쳐하기</Button>
          </div>
        </div>
      ))}
      </div>
      </div>
    </div>
  );
};

export default Edit;
