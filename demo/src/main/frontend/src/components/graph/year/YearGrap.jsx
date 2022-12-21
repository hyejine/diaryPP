import { useEffect, useState } from 'react';
import YearLine from './YearLine';
import MoodProgressBar from "../MoodProgressBar";

const YearGrap = (props) => {
    const date = new Date();
    const {currentUser} =props;
    const thisYear = date.getFullYear();
    const [yearList] = useState([]);
    const [setYearList] = useState([]);
    const [selectYear, setSelectYear] = useState();

    // const defaultYear = (value)=>{
    //     if(value){
    //         delete yearList[12];
    //         for(var j = (value.target.value-5); j <= (Number(value.target.value)+5); j++){
    //             // console.log(j);
    //             yearList.push(j);
    //         }
    //         const set = new Set(yearList);
    // const uniqueArr = [...set];
    //     } else{
    //         for(var i = (thisYear-5); i <= (thisYear+5); i++){
    //             yearList.push(i);
    //         }
    //     }
    // }

    const defaultYear = ()=>{
        for(var i = (thisYear-5); i <= (thisYear+5); i++){
            yearList.push(i);
        }
    }
    const set = new Set(yearList);
    const uniqueArr = [...set];

    const changeYear = (value)=>{
        setSelectYear(value.target.value)
    }

    useEffect(()=>{
        defaultYear()
    },[defaultYear()]);

    console.log(yearList);
    
    return (
        <div>
        <select onChange ={(s)=>{changeYear(s)}} defaultValue={thisYear} className="selectMonth">
            {/* {setYearList ? 
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
        } */}
            {yearList?.map((v) => (
            <option value={v} key={v}> {v} 년 </option> 
            ))}
        </select>
        <div >[ 기분 그래프 ]</div>
        <YearLine 
        selectYear= {selectYear ? selectYear : thisYear}
        currentUser= {currentUser}
        />
        <MoodProgressBar
         selectDay= {selectYear ? selectYear : thisYear}
         currentUser= {currentUser}
         />
        </div>
    );
};

export default YearGrap;