import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import CalendarCom from './components/calendar/CalendarCom';
import Header from "./components/common/Header";
import Graph from './components/graph/Graph';
import AuthenticationService from "./components/login/AuthenticationService";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "./reducer/userSlice";

const Main = (props)=> {
    const {currnetUser} = props;
    const [tap, setTap] = useState('캘린더');

    const onChange =(value)=>{
        setTap(value.target.innerText);
    }

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const LogoutFunc = () => {
        dispatch(clearUser(user));
    }
    console.log(currnetUser);
    useEffect(() => {
      // LogoutFunc()
      console.log(user);
    //   axios.get(`/account/${AuthenticationService.getLoggedInUserName()}`)
    //   .then((response) => {
    //     console.log(response);} )
    //     .catch((error)=>{
    //       console.log(error);
    //     })
    }, []);

        return (
          <div className="main">
            <Header currnetUser={user}/>
            <div onClick={onChange} className="tab">     
              <span key="1" className='calendarTab'>캘린더</span>
              <span key="2" className='graphTab'>기분 그래프</span>
            </div>
            <div className='test'>{tap === "캘린더" ? <CalendarCom/> : <Graph/>}</div>
          </div>
        );
   
}

export default Main;