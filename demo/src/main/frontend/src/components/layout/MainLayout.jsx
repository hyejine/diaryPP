import { useState } from "react";
import Header from "./common/Header";
import CalendarCom from "../calendar/CalendarCom";
import GraphCom from "../graph/GraphCom";
import '../layout/main-boarder-Layout.scss';

const MainLayout = (props) => {
  const {setBackColor, setBackImage, setFontChange, fontChange, currentUser} = props;
  const [tab, setTab] = useState("캘린더");
  const [tabClass, setTabClass] = useState(0);

  const onChange = (value) => {
    setTab(value.target.innerText);
  };

  const onTabChange = (value)=>{
    setTabClass(value)
  }
console.log(tabClass);
  return (
    <div className="main" >
      <div className="mainWrap">
      <Header setBackColor={setBackColor} setBackImage={setBackImage} setFontChange={setFontChange} fontChange= {fontChange} currentUser={currentUser}/>
      <div className="mainContentWarp">
      <div onClick={onChange} className="mainLayoutTab">
        <div key="1" className={tabClass ===0 ? "calendarTab tabActive":"calendarTab"} onClick={()=>onTabChange(0)}><div className={tabClass ===0 ? "activeBorder":""}>캘린더</div></div>
        <div key="2" className={tabClass ===1 ? "graphTab tabActive":"graphTab"} onClick={()=>onTabChange(1)}>기분 그래프</div>
      </div>
      <div className="mainContent">
        <div className="mainInner">
          <div >
            {tab === "캘린더" ? <CalendarCom currentUser={currentUser}/> : <GraphCom />}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};
export default MainLayout;
