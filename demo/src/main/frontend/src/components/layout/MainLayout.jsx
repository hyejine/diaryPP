import { useState } from "react";
import Header from "./common/Header";
import CalendarCom from "../calendar/CalendarCom";
import GraphCom from "../graph/GraphCom";
import '../layout/main-boarder-Layout.scss';

const MainLayout = (props) => {
  const {setBackColor, setBackImage, currentUser, userCustom} = props;
  const [tabClass, setTabClass] = useState(0);

  const onTabChange = (value)=>{
    setTabClass(value)
  }
  return (
    <div className="main" style={{}}>
      <div className="mainWrap">
      <Header setBackColor={setBackColor} setBackImage={setBackImage} currentUser={currentUser} userCustom={userCustom}/>
      <div className="mainContentWarp">
      <div className="mainLayoutTab">
        <div key="1" className={tabClass ===0 ? "tabActive tabB":"calendarTab"} onClick={()=>onTabChange(0)}>캘린더</div>
        <div key="2" className={tabClass ===1 ? "tabActive tabB":"graphTab"} onClick={()=>onTabChange(1)}>기분 그래프</div>
      </div>
      <div className="mainContent">
        <div className="mainInner innerpdding">
          <div >
            {tabClass ===0 ? <CalendarCom currentUser={currentUser} /> : <GraphCom currentUser={currentUser} userCustom ={userCustom}/>}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};
export default MainLayout;
