import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

function Signup(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [cnic, setCnic] = useState(null);
  const [errors, setErrors] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState('');

  
  const handleRegistration = (e) => {
    e.preventDefault();

    let validator = FormValidation();
    
    if (validator.error) {
      setErrors(validator.messages)
      return;
    }
    
    props.registerUser({ username, email, password, address, cnic });
    showError(props.showMessage);

    if (props.showSuccess) {
      setUsername('');
      setEmail('');
      setAddress('');
      setCnic('');
      setShowSuccessAlert(props.showSuccess);
      setTimeout(() => {
        props.redirectPage('login')
      }, 3000)
    }

  };

  const FormValidation = () => {

    let response = {
      error: false, 
      messages: []
    }

    if (!username) {
      response.error = true;
      response.messages.push('Name field is required!');
    }

    if (!validateEmail(email)) {
      response.error = true;
      response.messages.push('Invalid Email provided!');
    }

    if (password.length < 7) {
      response.error = true;
      response.messages.push('Invalid Password provided!');
    }

    if (!address) {
      response.error = true;
      response.messages.push('Address field is required!');
    }

    if (!validateFileUpload(cnic)) {
      response.error = true;
      response.messages.push('Invalid file format. Please select a PDF file!');
    }

    return response;
  }

  const validateFileUpload = (file) => {
    return (!file || file.type !== 'application/pdf');
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };


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
        <h2>Sign Up</h2>

        {errors && (errors.map((message, index) => (
          <Alert key={index} variant="danger" onClick={() => closeErrorAlert(index)} dismissible>
            {message}
          </Alert>
        )))}

        {showSuccessAlert && (
          <Alert variant="success" dismissible>
            {showSuccessAlert}
          </Alert>
        )}

        <Form onSubmit={handleRegistration}>
          <Form.Group controlId="username">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
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
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="cnic">
            <Form.Label>CNIC</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setCnic(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="mt-2">
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
