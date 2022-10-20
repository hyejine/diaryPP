import { useEffect, useState } from 'react';
import YearLine from './YearLine';
import MoodProgressBar from "../MoodProgressBar";

const YearGrap = () => {
    const date = new Date();
    const thisYear = date.getFullYear();
    const [yearList] = useState([]);
    const [setYearList] = useState([]);
    const [selectYear, setSelectYear] = useState();

    const defaultYear = (value)=>{
        if(value){
            // setYearList("");
            delete yearList[12];
            for(var j = (value.target.value-5); j <= (Number(value.target.value)+5); j++){
                // console.log(j);
                yearList.push(j);
            }
            const set = new Set(yearList);
    const uniqueArr = [...set];
    // console.log(uniqueArr);
            // console.log(yearList);
            // console.log(yearList);
        } else{
            for(var i = (thisYear-5); i <= (thisYear+5); i++){
                yearList.push(i);
            }
            // console.log(yearList);
            // console.log(value);
        }
    }

    useEffect(()=>{
        defaultYear()
    },[  defaultYear(), yearList]);
    
    return (
        <div>
        <select onChange ={(s)=>{defaultYear(s)}} defaultValue={thisYear} className="selectMonth">
            {setYearList ? 
            <>
            {setYearList?.map((v) => (
                <option value={v} key={v}> {v} 년 </option> 
                ))}
            </> : 
            <>
              {yearList?.map((v) => (
            <option value={v} key={v}> {v} 년 </option> 
            ))}
            </>
        }
            {yearList?.map((v) => (
            <option value={v} key={v}> {v} 년 </option> 
            ))}
        </select>
        <div >[ 기분 그래프 ]</div>
        <YearLine 
        selectYear= {selectYear ? selectYear : thisYear}
        />
        <MoodProgressBar
         selectDay= {selectYear ? selectYear : thisYear}
         />
        </div>
    );
};

export default YearGrap;