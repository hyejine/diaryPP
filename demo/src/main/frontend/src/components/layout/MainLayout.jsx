import { useState } from "react";
import Header from "./common/Header";
import CalendarCom from "../calendar/CalendarCom";
import Graph from "../graph/Graph";
import '../layout/mainLayout.scss';

const MainLayout = () => {
  const [tap, setTap] = useState("캘린더");

  const onChange = (value) => {
    setTap(value.target.innerText);
  };

  return (
    <div className="main">
      <Header />
      <div className="mainWarp">
      <div onClick={onChange} className="mainLayoutTab">
        <span key="1" className="calendarTab">캘린더</span>
        <span key="2" className="graphTab">기분 그래프</span>
      </div>
      <div className="mainContent">
        <div className="mainInner">
          <div className="test">
            {tap === "캘린더" ? <CalendarCom /> : <Graph />}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
export default MainLayout;
