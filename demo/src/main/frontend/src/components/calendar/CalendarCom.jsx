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
import { current } from "@reduxjs/toolkit";

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
    }else if (currentUser?.email !== "" && currentUser?.email !== undefined && currentUser?.email !== null){
        setSelectDate(info.date);
        setModalOpen(true);
    } else{
      setModalActive(true);
    }
  };

  useEffect(()=>{
    const data ={
      diary_id: -1,
      user_email: currentUser?.email
    }
    axios.post(`/board/getBoard`,data)
    .then((res) => {
      setCalerdarData(res.data);
    })
    .catch((err) => console.log(err));
},[currentUser])

  return (
    <div id="calendarPage"  >
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
      fontChange = {fontChange}
      show={modalActive}
      contents="????????? ??? ????????? ?????? ???????????????."
      hide={()=>setModalActive(false)}
      url ="login"
      />
      <SelectEmojiModal
      fontChange={fontChange}
      show={modalOpen}
      currentUser={currentUser}
      state="????????? ???????????????"
      selectDate = {selectDate}
      hide={() => setModalOpen(false)}
      />
    </div>
  );
};

export default CalendarCom;
