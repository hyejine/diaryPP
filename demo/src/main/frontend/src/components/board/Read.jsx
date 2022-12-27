import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { localDateRenderer, diaryDowunloadRenderer } from "../../utils/index";
import DeleteModal from '../common/CommonModal';
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import axios from "axios";
import "./write.scss";

const Read = (props) => {
  const {currentUser} = props;
  const { diary_id } = useParams();
  const [board, setBoard] = useState();
  const [ modalActive, setModalActive] = useState();
  const navigate = useNavigate();
  const refs = useRef([]);

  useEffect(() => {
    axios
    .get(`/board/getMonthBoard/${currentUser.email}`)
    .then((res) => {
      setBoard(res.data);
      refs.current[diary_id].scrollIntoView({ block: 'center' });
    })
    .catch((err) => console.log(err));
  }, []);
  console.log(currentUser); 
  const onDelete =(id)=>{
    axios.delete(`/board/deleteBoard/${id}`)
      .then((res) => {
        setModalActive(true);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

    // const onCapture = (diary_date) =>{
    //   html2canvas(document.getElementById('diaryDownload')).then(canvas=>{
    //     onSave(canvas.toDataURL('image/png'), `${diaryDowunloadRenderer(diary_date)}Diary.png`)
    //   });
    // };

    // const onSave = (uri, filename) => {
    //   console.log("onSave");
    //   var link = document.createElement('a');
    //   document.body.appendChild(link);
    //   link.href = uri;
    //   link.download = filename;
    //   link.click();
    //   document.body.removeChild(link);
    // };

  return (
    <div className="boardPage" id="diaryDownload">
      <div className="boardScroll autoScroll">
      {board?.map((value) => (
        <div className="editPage"  key ={value.diary_id} ref={(el) => (refs.current[value.diary_id] = el) }>
          <div className="dateDiv">
            <span className="date"> {localDateRenderer(value.diary_date)}</span>
            <span>
              <img src={value.emojiImageDto.emoji_image} className="emojiImage" alt="" />
            </span>
          </div>
          <div className="title">
          <span>제목 : {value.diary_title}</span>
          </div>
          <div className="editContent" dangerouslySetInnerHTML={{ __html: value.diary_content }} />
          <div className="sendButtonWrap2">
          <Button className="sendButton" onClick={()=> navigate(`/board/edit/${value.diary_id}`)}>수정</Button>
          <Button className="sendButton" onClick={()=>onDelete(value.diary_id)}>삭제</Button>
          {/* <Button className="sendButton" onClick={()=>onCapture(value.diary_date)}>캡쳐하기</Button> */}
          </div>
        </div>
      ))}
      </div>
      <DeleteModal
      state={"Success"}
      show ={modalActive}
      hide={()=>setModalActive(false)}
      contents={"삭제되었습니다."}
      />
    </div>
  );
};

export default Read;
