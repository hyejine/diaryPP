import { useState } from "react";
import Header from "./common/Header";
import CalendarCom from "../calendar/CalendarCom";
import GraphCom from "../graph/GraphCom";
import '../layout/main-boarder-Layout.scss';

const MainLayout = (props) => {
  const {setBackColor, setBackImage, setFontChange, fontChange, currentUser} = props;
  const [tabClass, setTabClass] = useState(0);

  const onTabChange = (value)=>{
    setTabClass(value)
  }
  console.log("mainLayout: ", fontChange, currentUser.font);
  return (
    <div className="main" style={fontChange? {fontFamily : `${fontChange}`} : {fontFamily : `${currentUser.font}`} }>
      <div className="mainWrap">
      <Header setBackColor={setBackColor} setBackImage={setBackImage} setFontChange={setFontChange} fontChange= {fontChange} currentUser={currentUser}/>
      <div className="mainContentWarp">
      <div className="mainLayoutTab">
        <div key="1" className={tabClass ===0 ? "tabActive tabB":"calendarTab"} onClick={()=>onTabChange(0)}>캘린더</div>
        <div key="2" className={tabClass ===1 ? "tabActive tabB":"graphTab"} onClick={()=>onTabChange(1)}>기분 그래프</div>
      </div>
      <div className="mainContent">
        <div className="mainInner">
          <div >
            {tabClass ===0 ? <CalendarCom currentUser={currentUser} fontChange={fontChange}/> : <GraphCom />}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};
export default MainLayout;
