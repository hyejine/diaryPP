import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import "./calendar.scss";
import SelectEmojiModal from "./SelectEmojiModal";

const CalendarCom = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const onDateClick = (info) => {
    setModalOpen(true);
  };

  return (
    <div id="calendarPage">
      <FullCalendar
        className="calendar"
        // selectable = {true}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height={700}
        dateClick={onDateClick}
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
      onHide={() => setModalOpen(false)}
      />
    </div>
  );
};

export default CalendarCom;
