import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import "./calendar.scss";
import { Link } from "react-router-dom";
import SelectEmojiModal from "./SelectEmojiModal";
import { useEffect } from "react";
import { diaryDateRenderer } from "../../utils/index";
import axios from "axios";

const CalendarCom = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectDate, setSelectDate] = useState();
  const [calerdarData, setCalerdarData] = useState();
  const [isDate, setIsDate] = useState([]);

  const onLink = () =>{

  }
  const renderEventContent = (eventInfo) =>{
    console.log(selectDate);
    isDate.push(eventInfo.event.startStr);
    const result = eventInfo.event.title.length < 8 ? eventInfo.event.title : eventInfo.event.title.substr(0,8)+'...';
    return(
      <div id="calendarPage" onClick={onLink}>
        {/* state={{date:}} */}
      {/* <Link to="/board/edit" > */}
      <span className="calendarInner" >
      <img className="calendarEmoji" src ={eventInfo.event.groupId} alt=""/>
      <span className="calendarTitle">{result}</span>
      </span>
      {/* </Link> */}
      </div>
    )
  }

  const set = new Set(isDate);
  const uniqueArr = [...set];

  const onDateClick = (info) => {
    const test = diaryDateRenderer(info.date);

    if (uniqueArr.includes(test)){
      setModalOpen(false);
    }else {
      setSelectDate(info.date);
      setModalOpen(true); 
    }
  };

  useEffect(()=>{
    axios.get("board/getBoard")
    .then((res) => {
      console.log(res.data);
      setCalerdarData(res.data);
    })
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
            publicId : value.diary_id
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
