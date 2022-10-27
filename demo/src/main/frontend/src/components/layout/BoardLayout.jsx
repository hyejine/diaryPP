import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./common/Header";

const BoardLayout = () => {
  return (
    <div className="main">
      <div className="mainWrap">
        <Header />
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
