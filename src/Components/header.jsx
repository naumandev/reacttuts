import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Badge } from 'react-bootstrap';
import { BsFilePost } from 'react-icons/bs';

function Header(props) {

  const handleClick = (route) => {
    props.routePageAction(route)
  }

  const logout = () => {
    props.logoutAction()
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>Crypto Exchange</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={() => handleClick('login')}>Home</Nav.Link>
            <Nav.Link href="#action2">About</Nav.Link>
          </Nav>
          
            {props.showLoggedInUserName ? 
              <Nav className="my-2 mx-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
                <li className="nav-link">{props.showLoggedInUserName}</li>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </Nav>
            :
              <Nav className="my-2 mx-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
                <Nav.Link onClick={() => handleClick('login')}>Login</Nav.Link>
                <Nav.Link onClick={() => handleClick('signup')}>Sign Up</Nav.Link>
              </Nav>
            }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
