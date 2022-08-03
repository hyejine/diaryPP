import React, { useState } from "react";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import "./calendar.scss";

const CalendarCom = () => {
  return (
    <div className="calendar_css">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height={700}
      />
    </div>
  );
};

export default CalendarCom;
