import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const Regist = () => {
  // const bcrypt = require('bcryptjs');

  // const PW = 'er';
  // const salt = 12;

  // // 비동기 콜백
  // bcrypt.hash(PW , salt, (err, encryptedPW) => {
  //   console.log(encryptedPW);  //=> true
  //   console.log(err);
  // })
  // const hash = bcrypt.hashSync(PW, 12);

  // // 비동기 콜백
  // bcrypt.compare(PW , hash, (err, same) => {
  //   console.log(same);  //=> true
  //   console.log(err);
  // })
  const handleSubmit = (event) => {
    const request = {
      user_email: event.target.email.value,
      user_name: event.target.name.value,
      user_password: event.target.rePassword.value,
      sns_type: "diary"
    }
    console.log(request);
    event.preventDefault();

    axios.post('/user/regist',{...request})
    .then(response => console.log(response))
    .catch(error => console.log(error))
  };

  return (
    <div className="login_wrap">
      <div className="login_inner">
        <p className="title1 text_center">Welcome!</p>
        <p className="title2 text_center">Please login to continue</p>
        <div className="login_input">
        <Form onSubmit={handleSubmit}> 
        <Form.Group controlId="name">
        <Form.Label>name</Form.Label>
        <Form.Control type="text"/>
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email </Form.Label>
        <Form.Control type="email" />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>
      <Form.Group  controlId="rePassword">
      <Form.Label>Re-Enter Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>
      <div className="login_button">
      <Button className="login_b" type="submit">
        Submit
      </Button>
      </div>
    </Form>
    </div>
      </div>
    </div>
  );
};

export default Regist;
