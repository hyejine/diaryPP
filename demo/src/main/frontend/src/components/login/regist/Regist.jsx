import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const { Formik } = Formik;

const Regist = () => {

  const handleSubmit = (event) => {
   const form = event.currentTarget;
   if (form.checkValidity() === false) {
     event.preventDefault();
     event.stopPropagation();
   console.log("b");
    }
console.log("a");
   setValidated(true);
    // const request = {
    //   user_email: event.target.email.value,
    //   user_name: event.target.name.value,
    //   user_password: event.target.rePassword.value,
    //   sns_type: "diary"
    // }
    // console.log(request);
    // event.preventDefault();

    // axios.post('/user/regist',{...request})
    // .then(response => console.log(response))
    // .catch(error => console.log(error))
  };

  return (
    <div className="login_wrap">
      <div className="login_inner">
        <p className="title1 text_center">Welcome!</p>
        <p className="title2 text_center">Please login to continue</p>
        <div className="login_input">
        <Formik></Formik>
        <Form onSubmit={handleSubmit} noValidate validated={validated}> 
        <Form.Group controlId="name">
        <Form.Label>name</Form.Label>
        <Form.Control type="text" required />
        <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email </Form.Label>
        <Form.Control type="email" required/>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" required/>
      </Form.Group>
      <Form.Group  controlId="rePassword">
      <Form.Label>Re-Enter Password</Form.Label>
        <Form.Control type="password" required/>
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
