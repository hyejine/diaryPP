import React from 'react';
// import { Form } from 'react-bootstrap';

const Regist =()=>  {
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

  const handleSubmit=(value)=>{
    console.log("ef");
    console.log(value.target);
    value.preventDefault();
  }
        return (
          <div className="login_wrap">
          {/* <Form onSubmit={handleSubmit}>
             <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group> */}
          <div className="login_inner">
            <p className="title1 text_center">Sign Up!</p>
            <p className="title2 text_center">Please enter your details to sign up</p>
            <div className="login_input">
              <p className="name" value="name">Name</p>
              <input />
              <p className="email" value="email">Email</p>
              <input />
              <p className="password" value="password">Password</p>
              <input />
              <p className="email" value="rePassword">Re-Enter Password</p>
              <input />
            </div>
            <div className="login_button">
              <button className="login_b" type="submit">Sing up</button>
            </div>
          </div>
          {/* </Form> */}
        </div>
        );
}

export default Regist;