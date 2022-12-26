import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import "./calendar.scss";
import SelectEmojiModal from "./SelectEmojiModal";
import { useEffect } from "react";
import { diaryDateRenderer } from "../../utils/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import LoginModal from '../common/CommonModal';

const CalendarCom = (props) => {
  const {currentUser, fontChange} = props; 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectDate, setSelectDate] = useState();
  const [calerdarData, setCalerdarData] = useState();
  const [modalActive, setModalActive ] =useState();
  const [isDate, setIsDate] = useState([]);
  const navigate = useNavigate();

  const renderEventContent = (eventInfo) =>{
    isDate.push(eventInfo.event.startStr);
    const result = eventInfo.event.title.length < 8 ? eventInfo.event.title : eventInfo.event.title.substr(0,8)+'...';
    return(
      <div id="calendarPage" className="test">
      <Button onClick={()=> navigate(`/board/read/${eventInfo.event._def.extendedProps.publicId}`)}>
      {/* <Link to="/board/read" state={{calendarId: eventInfo.event._def.extendedProps.publicId}} > */}
      <span className="calendarInner" >
      <img className="calendarEmoji" src ={eventInfo.event.groupId} alt=""/>
      <span className="calendarTitle">{result}</span>
      </span>
      </Button>
      {/* </Link> */}
      </div>
    )
  }

  const onDateClick = (info) => {
    const set = new Set(isDate);
    const uniqueArr = [...set];
    const test = diaryDateRenderer(info.date);

    if (uniqueArr.includes(test)){
      setModalOpen(false);
    }else {
      if(currentUser?.email !== ""){
        setSelectDate(info.date);
        setModalOpen(true);
      } else{
        setModalActive(true);
      }
    }
  };
console.log(currentUser);
  useEffect(()=>{
    const diary_id = -1;
    console.log(currentUser?.email);
    axios.get(`board/getBoard/${diary_id}/${currentUser.email}`)
    .then((res) => {
      setCalerdarData(res.data);
    })
    .catch((err) => console.log(err));
},[])

  return (
    <div id="calendarPage" style={fontChange? {fontFamily : `${fontChange}`} : {fontFamily : `${currentUser.font}`} }>
      <FullCalendar
        id="calendar"
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height={700}
        textColor ="white"
        dateClick={onDateClick}
        eventContent ={renderEventContent}
        headerToolbar = {{
          start: 'title',
          center: '',
          end: 'prev,next'
        }
        }
        events ={calerdarData?.map((value)=>(
          {
            title : value.diary_title,
            start : value.diary_date,
            groupId : value.emojiImageDto.emoji_image,
            publicId : value.diary_id
          }
        ))}
      />
      <LoginModal
      state="Login"
      show={modalActive}
      contents="로그인 후 서비스 이용 가능합니다."
      hide={()=>setModalActive(false)}
      url ="login"
      />
      <SelectEmojiModal
      show={modalOpen}
      currentUser={currentUser}
      state="기분을 선택하세요"
      selectDate = {selectDate}
      hide={() => setModalOpen(false)}
      />
    </div>
  );
};

export default CalendarCom;
