import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import MonthLine from "./nivo/MonthLine";
import MoodProgressBar from "./MoodProgressBar";

const MonthGrap = () => {
    const today = new Date();
    const thisMonth = today.getMonth()+1;
    
    const month = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const [selectMonth, setSelectMonth] = useState();

    const handleChange = (value) => {
        setSelectMonth(value.target.value);
    };

    return (
        <div>
        <select onChange={handleChange} defaultValue={thisMonth}>
            {month.map((v) => (
            <option value={v} key={v}> {v} </option> 
            ))}
        </select>
        <MonthLine 
        selectMonth= {selectMonth ? selectMonth : thisMonth}
        />
        <MoodProgressBar
         selectMonth= {selectMonth ? selectMonth : thisMonth}
         />
        </div>
    );
};

export default MonthGrap;
