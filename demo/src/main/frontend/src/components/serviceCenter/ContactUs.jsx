import React from 'react';
import { Form, Button } from "react-bootstrap";
import CheckBox from '../../resource/image/checkPixel.png';

const ContactUs = () => {
    
    const onSubmit =()=>{

    }

    return (
        <div className='contactUsTap'>
           <div className='writeC'>
           <Form onSubmit={onSubmit}>
            <img src={CheckBox} alt='' className='checkBox'></img>
            <span >의견을 적어주세요!</span>
            <input type="text"> </input>
            {/* <Form.Group controlId="title">
            <Form.Control
              type="text"
              required
            //   defaultValue={diaryData?.diary_title}
            />
          </Form.Group> */}
           </Form>
           </div>
        </div>
    );
};

export default ContactUs;