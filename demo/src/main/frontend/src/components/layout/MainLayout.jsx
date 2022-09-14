import React from "react";
import { Outlet } from 'react-router-dom';
import Header from "../common/Header";
const MainLayout = ()=>{
    return(
        <div className="main">
         <Header/>
         <div className="mainContent">
            <div className="mainInner">
            <Outlet/>
            </div>
         </div>
        </div>
    );   
}
export default MainLayout;