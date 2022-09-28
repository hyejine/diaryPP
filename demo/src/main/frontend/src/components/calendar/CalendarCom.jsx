import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import "./calendar.scss";
import SelectEmojiModal from "./SelectEmojiModal";
import { useEffect } from "react";
import axios from "axios";

const CalendarCom = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectDate, setSelectDate] = useState();


  const onDateClick = (info) => {
    setSelectDate(info.date);
    setModalOpen(true);
  };

  const [test, setTest] = useState();

  useEffect(()=>{
    axios.get("board/getBoard")
    .then((res) => {console.log(res.data)
      setTest(res.data);})
    .catch((err) => console.log(err));
},[])
  return (
    <div id="calendarPage">
      <FullCalendar
        className="calendar"
        // selectable = {true}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height={700}
        dateClick={onDateClick}
        events ={test?.map((value)=>(
          {
            title : value.diary_title +value.id,
            start : value.diary_date
          }
        ))}
        // eventClick={handleEventClick}
        // select={handleDateSelect}
        // weekends={true}
        // events={sch_list}
      />
      {/* <Modal
        size="lg"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        centered
      >

          <p className="selectEmoji">dfdf</p>

      </Modal> */}
      <SelectEmojiModal
      show={modalOpen}
      selectDate = {selectDate}
      onHide={() => setModalOpen(false)}
      />
    </div>
  );
};

export default CalendarCom;
