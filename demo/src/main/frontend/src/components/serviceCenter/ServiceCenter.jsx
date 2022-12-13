import { useState } from "react";
import { Close, Minimize } from "@mui/icons-material";
import { Tabs, Tab } from "react-bootstrap";
import Faq from "./FAQ";
import ContactUs from "./ContactUs";
import WebInfo from "./WebInfo";
import "./serviceCenter.scss";

const ServiceCenter = (props) => {

  return (
    <div className="serviceCenterPage">
      <div className="webHeader">
        <span>고객센터</span>
        <div className="headerButton">
          <div className="downB pixelBorder">
            <Minimize />
          </div>
          <div className="downB pixelBorder">
            <Close />
          </div>
        </div>
      </div>
      <div className="webContent">
        <Tabs defaultActiveKey="FAQ" id="tabCustom">
          <Tab eventKey="FAQ" title="FAQ" >
            <Faq />
          </Tab>
          <Tab eventKey="문의하기" title="문의하기">
            <ContactUs />
          </Tab>
          <Tab eventKey="웹정보" title="웹 정보">
            <WebInfo />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ServiceCenter;
