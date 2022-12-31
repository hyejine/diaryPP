import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import MonthLine from "./MonthLine";
import MoodProgressBar from "../MoodProgressBar";

const MonthGrap = (props) => {
    const {currentUser, fontChange} =props;
    const today = new Date();
    const thisMonth = today.getMonth()+1;
    
    const month = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const [selectMonth, setSelectMonth] = useState();

    const handleChange = (value) => {
        setSelectMonth(value.target.value);
    };

    return (
        <div>
        <select onChange={handleChange} defaultValue={thisMonth} className="selectMonth">
            {month.map((v) => (
            <option value={v} key={v}> {v} 월 </option> 
            ))}
        </select>
        <div >[ 기분 그래프 ]</div>
        <MonthLine 
        selectMonth= {selectMonth ? selectMonth : thisMonth}
        currentUser={currentUser}
        fontChange= {fontChange}
        />
        <MoodProgressBar
         selectDay= {selectMonth ? selectMonth : thisMonth}
         currentUser={currentUser}
         />
        </div>
    );
};

export default MonthGrap;
