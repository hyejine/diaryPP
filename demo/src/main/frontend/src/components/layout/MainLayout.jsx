import { useState } from "react";
import Header from "./common/Header";
import CalendarCom from "../calendar/CalendarCom";
import GraphCom from "../graph/GraphCom";
import '../layout/mainLayout.scss';

const MainLayout = (props) => {
  const {setBackColor, setBackImage, setFontChange, fontChange} = props;
  const [tap, setTap] = useState("캘린더");

  const onChange = (value) => {
    setTap(value.target.innerText);
  };

  return (
    <div className="main" >
      <div className="mainWrap">
      <Header setBackColor={setBackColor} setBackImage={setBackImage} setFontChange={setFontChange} fontChange= {fontChange}/>
      <div className="mainContentWarp">
      <div onClick={onChange} className="mainLayoutTab">
        <span key="1" className="calendarTab">캘린더</span>
        <span key="2" className="graphTab">기분 그래프</span>
      </div>
      <div className="mainContent">
        <div className="mainInner">
          <div className="test">
            {tap === "캘린더" ? <CalendarCom /> : <GraphCom />}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};
export default MainLayout;
