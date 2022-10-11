import React from "react";
import { Outlet } from 'react-router-dom';
import Header from "./common/Header";

const BoardLayout = ()=>{
    return(
        <div className="main">
         <Header/>
            <Outlet/>
        </div>
    );   
}
export default BoardLayout;