import { useState } from "react";
import Header from "./common/Header";
import CalendarCom from "../calendar/CalendarCom";
import GraphCom from "../graph/GraphCom";
import '../layout/main-boarder-Layout.scss';

const MainLayout = (props) => {
  const {setBackColor, setBackImage, setFontChange, fontChange} = props;
  const [tab, setTab] = useState("캘린더");

  const onChange = (value) => {
    setTab(value.target.innerText);
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
          <div >
            {tab === "캘린더" ? <CalendarCom /> : <GraphCom />}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};
export default MainLayout;
