import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(email.length < 1) {
      showErrorMessageAlert('Email field is required.');
      return;
    }
    if(password.length < 1) {
      showErrorMessageAlert('Password field is required.');
      return;
    }
    props.loginUser({ email, password });
    showErrorMessageAlert(props.showMessage);
  };

  useEffect(() => {
    console.log('myProp changed:', props.showMessage);
    showErrorMessageAlert(props.showMessage);
  }, [props.showMessage]);

  const showErrorMessageAlert = (message) => {
    setShowAlert(false);
    setShowErrorAlert(message);
    setTimeout(() => {
      setShowErrorAlert('');
    }, 3000);
  };

  return (
    <div className="row mt-5">
      <div className="col-6 mx-auto">
        {showErrorAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {showErrorAlert}
          </Alert>
        )}
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
