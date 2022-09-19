import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { cookies } from "./config";
import { Link } from "react-router-dom";

export default function NavbarCustom(){
  const navElementStyle={ color: 'inherit',paddingLeft: '10px', textDecoration: 'none' }
  //Return different components based on if user is logged in
  return(
      <Navbar expand="md py-3" variant="light" bg="light">
      <Container fluid>
        <Navbar.Brand className="navbar-brand"> <Link style={navElementStyle} to="/">Home</Link></Navbar.Brand>
        <Nav>
          {cookies.get('LoggedIn') ? "" : <Link style={navElementStyle} to="/Login">Login</Link>}
          {cookies.get('LoggedIn') ? <Link style={navElementStyle} to="/Logout">Logout</Link> : ""}
          {cookies.get('LoggedIn') ? "" : <Link style={navElementStyle} to="/createAccount">CreateAccount</Link>}
          <Link style={navElementStyle} to="/PostSomething">PostSomething</Link>
          {cookies.get('LoggedIn') ?<Link style={navElementStyle} to="/Account">Account</Link>: ""}
          <Link style={navElementStyle} to="/homecontroll">Test</Link>
        </Nav>
      </Container>
    </Navbar>
  )
}