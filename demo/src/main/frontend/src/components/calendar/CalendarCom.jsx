import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import "./calendar.scss";
import { Link } from "react-router-dom";
import SelectEmojiModal from "./SelectEmojiModal";
import { useEffect } from "react";
import axios from "axios";

const CalendarCom = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectDate, setSelectDate] = useState();
  const [calerdarData, setCalerdarData] = useState();
  const [isDate, setIsDate] = useState([]);

  const renderEventContent = (eventInfo) =>{
    const result = eventInfo.event.title.length < 8 ? eventInfo.event.title : eventInfo.event.title.substr(0,8)+'...';
    return(
      <div id="calendarPage">
      <Link to="/board/edit">
      <div className="calendarInner" >
      <img className="calendarEmoji" src ={eventInfo.event.groupId} alt=""/>
      <span className="calendarTitle">{result}</span>
      </div>
      </Link>
      </div>
    )
  }

  const onDateClick = (info) => {
    console.log(info);
    setSelectDate(info.date);
    setModalOpen(true);
  };

  useEffect(()=>{
    axios.get("board/getBoard")
    .then((res) => {console.log(res.data)
      setCalerdarData(res.data);})
    .catch((err) => console.log(err));
},[])

  return (
    <div id="calendarPage">
      <FullCalendar
        className="calendar"
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height={700}
        dateClick={onDateClick}
        eventContent ={renderEventContent}
        events ={calerdarData?.map((value)=>(
          {
            title : value.diary_title,
            start : value.diary_date,
            groupId : value.emojiImageDto.emoji_image,
          }
        ))}
        // eventClick={handleEventClick}
        // events={sch_list}
      />
      <SelectEmojiModal
      show={modalOpen}
      selectDate = {selectDate}
      onHide={() => setModalOpen(false)}
      />
    </div>
  );
};

export default CalendarCom;
