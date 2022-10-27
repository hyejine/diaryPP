import { useState } from 'react';
import { Close, Minimize } from "@mui/icons-material";
import Faq from "./FAQ";
import ContactUs from "./ContactUs";

import './serviceCenter.scss';
// import tab from './'


const ServiceCenter = () => {
    const tabList = ["FAQ", "문의하기", "웹 정보"]; 
    const [ tap, setTap ] = useState("문의하기");

    const tabChange =(value)=>{
        setTap(value.target.innerText);
    }
    
    console.log(tap === "FAQ" ? "FAQ" : "b");
    console.log(tap, "FAQ");

    return (
        <div className='serviceCenterPage'>
            <div className='webHeader'>
                <span>고객센터</span> 
                <div className='headerButton'>
                    <div className='downB'> <Minimize/> </div>
                    <div className='downB'> <Close/> </div>
                </div>
            </div>
            <div className='webContent'>
                <div  onClick={(v)=>{tabChange(v)}}>
                    {tabList.map((vlaue, index)=>(
                       <span className='tabB' key={index}> {vlaue} </span>
                    ))}
                </div>
                <div>
                    <div>
                    {tap === "FAQ" && <Faq />}
                    {tap === "문의하기" && <ContactUs />}
                        {/* {tap === `${tap}` && <tab />} */}
                        {/* {tap === "FAQ" && <Faq />}
                        {tap === "문의하기" && <Faq />}
                        {tap === "웹 정보" && <Faq />} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCenter;