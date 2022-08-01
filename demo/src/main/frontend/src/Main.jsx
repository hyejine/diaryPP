import React, { useState } from 'react';

import CalendarCom from './components/calendar/CalendarCom';
import Header from "./components/common/Header";

const Main = ()=> {
    const [tap, setTap] = useState('');

    const onCalendar =()=>{
        setTap('calendar');
    }
    const onGrap =()=>{
        setTap('grap');
    }
        return (
            <div className="main">
            <Header></Header>
            <div onClick={onCalendar}>캘린더</div>
              <div onClick={onGrap}>기분 그래프</div>
            <CalendarCom></CalendarCom>
            </div>
        )
   
}

export default Main;