import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let validator = FormValidation();
    
    if (validator.error) {
      setErrors(validator.messages)
      return;
    }

    props.loginUser({ email, password });
    showError(props.showMessage);
    
  };

  const FormValidation = () => {

    let response = {
      error: true, 
      messages: []
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) response.messages.push('Email field is requiredd!');
    if (!password) response.messages.push('Password field is requiredd!');

    if (email && !emailPattern.test(email)) response.messages.push('Invalid Email provided!');

    if (response.messages.length === 0) response.error = false;
    
    return response;
  }

  const showError = (message) => {
    const newError = [...errors, message];
    setErrors(newError);
  };

  const closeErrorAlert = (index) => {
    const newError = [...errors];
    newError.splice(index, 1);
    setErrors(newError);
  };

  return (
    <div className="row mt-5">
      <div className="col-6 mx-auto">
        {errors && (errors.map((message, index) => (
          <Alert key={index} variant="danger" onClick={() => closeErrorAlert(index)} dismissible>
            {message}
          </Alert>
        )))}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" className="mt-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="mt-2">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
