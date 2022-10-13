import { ProgressBar } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const MoodProgressBar = (props) => {
    const {selectMonth} = props;

    useEffect(() => {
        axios
        .get(`/board/getMonthProgress/${selectMonth}`)
        .then((res) => {
            console.log(res);
            // setMonthData(res.data);
        })
        .catch((error) => console.log(error));
    }, [selectMonth]);

    const a= 100;
    const b= 100;
    const c= 0;
    const d= 0;
  return (
    <div>
      <div>기분 분포</div>
      <ProgressBar>
        <ProgressBar className="a" now={a} key={1} label={`${a}%`} />
        <ProgressBar  now={b} key={2} label={`${b}%`} />
        <ProgressBar variant="danger" now={c} key={3} label={`${c}%`} />
        <ProgressBar now={d} key={4} label={`${d}%`} />
    </ProgressBar>
    </div>
  );
};

export default MoodProgressBar;
