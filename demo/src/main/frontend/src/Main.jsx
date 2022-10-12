import React, { useState } from 'react';
import { useEffect } from 'react';
import CalendarCom from './components/calendar/CalendarCom';
import Header from "./components/layout/common/Header";
import GraphCom from './components/graph/GraphCom';
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "./reducer/userSlice";

const Main = (props)=> {
    const {tap} = props;
    console.log(tap);
    // const [tap, setTap] = useState('캘린더');

    // const onChange =(value)=>{
    //     setTap(value.target.innerText);
    // }

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const LogoutFunc = () => {
        dispatch(clearUser(user));
    }
    useEffect(() => {
      // LogoutFunc()
    //   axios.get(`/account/${AuthenticationService.getLoggedInUserName()}`)
    //   .then((response) => {
    //     console.log(response);} )
    //     .catch((error)=>{
    //       console.log(error);
    //     })
    }, []);

        return (
          <div >
            {/* <Header currnetUser={user}/> */}
            {/* <div onClick={onChange} className="tab">     
              <span key="1" className='calendarTab'>캘린더</span>
              <span key="2" className='graphTab'>기분 그래프</span>
            </div>
            <div className='test'>{tap === "캘린더" ? <CalendarCom/> : <Graph/>}</div> */}
          </div>
        );
   
}

export default Main;