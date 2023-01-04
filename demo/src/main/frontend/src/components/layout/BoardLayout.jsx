import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./common/Header";

const BoardLayout = (props) => {
  const {currentUser, setBackColor, setBackImage, userCustom} = props;

  return (
    <div className="main">
      <div className="mainWrap">
        <Header setBackColor={setBackColor} setBackImage={setBackImage} currentUser={currentUser} userCustom={userCustom}/>
        <div className="mainContentWarp">
          <div className="mainContent">
            <div className="mainInner">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoardLayout;
