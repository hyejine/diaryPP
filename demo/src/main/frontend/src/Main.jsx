import React, { useState } from 'react';

import CalendarCom from './components/calendar/CalendarCom';
import Header from "./components/common/Header";
import Graph from './components/graph/Graph';

const Main = ()=> {
    const [tap, setTap] = useState('캘린더');

    const onChange =(value)=>{
        setTap(value.target.innerText);
    }

        return (
          <div className="main">
            <Header />
            <div onClick={onChange} className="tab">
              <span key="1" className='calendarTab'>캘린더</span>
              <span key="2" className='graphTab'>기분 그래프</span>
            </div>
            <div className='test'>{tap === "캘린더" ? <CalendarCom/> : <Graph/>}</div>
          </div>
        );
   
}

export default Main;