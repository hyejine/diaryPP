import { useEffect, useState } from 'react';
import YearLine from './YearLine';
import MoodProgressBar from "../MoodProgressBar";

const YearGrap = (props) => {
    const { currentUser, fontChange } = props;
    const date = new Date();
    const thisYear = date.getFullYear();
    const [selectY, setSelectY] = useState(thisYear);
    const [yearList] = useState([]);
    const [selectYear, setSelectYear] = useState();

    const defaultYear = (e) => {
        yearList.length = 0;
        const start = Number(e) - 2;
        const end = Number(e) + 2;
        for (var i = start; i <= end; i++) {
            yearList.push(i);
        }
    }

    const changeYear = (value) => {
        setSelectY(value.target.value);
        setSelectYear(value.target.value);
    }

    useEffect(() => {
        defaultYear(selectY);
    }, [defaultYear(selectY)]);

    return (
        <div>
            <select onChange={(s) => { changeYear(s) }} defaultValue={thisYear} className="selectMonth">
                {yearList?.map((v) => (
                    <option value={v} key={v}> {v} 년 </option>
                ))}
            </select>
            <div >[ 기분 그래프 ]</div>
            <YearLine
                selectYear={selectYear ? selectYear : thisYear}
                currentUser={currentUser}
                fontChange={fontChange}
            />
            <MoodProgressBar
                selectDay={selectYear ? selectYear : thisYear}
                currentUser={currentUser}
            />
        </div>
    );
};

export default YearGrap;