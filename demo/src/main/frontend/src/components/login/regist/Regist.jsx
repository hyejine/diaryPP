import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";


const Regist = () => {
  const [userId, setUserId] = useState();
  const handleSubmit = (event) => {

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

  const onChangeValue = (event)=>{
    setUserId(event.target.value);
  }
  
  const checkId = ()=>{
    axios.get(`/user/getId/${userId}`)
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
  }

  return (
    <div className="login_wrap">
      <div className="login_inner">
        <p className="title1 text_center">Welcome!</p>
        <p className="title2 text_center">Please login to continue</p>
        <div className="login_input">
        <Form onSubmit={handleSubmit} noValidate > 
        <Form.Group controlId="name">
        <Form.Label>name</Form.Label>
        <Form.Control type="text" required />
        <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email </Form.Label>
        <Form.Control type="email" required onChange={onChangeValue}/>
        <Button onClick={checkId}>중복확인</Button>
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
