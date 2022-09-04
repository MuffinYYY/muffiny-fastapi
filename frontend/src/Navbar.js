import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { cookies } from "./config";

export default function NavbarCustom(){
  
  //Return different components based on if user is logged in
  return(
      <Navbar expand="md py-3" variant="light" bg="light">
      <Container fluid>
        <Navbar.Brand className="navbar-brand" href="/">Home</Navbar.Brand>
        <Nav>
          {cookies.get('LoggedIn') ? "" : <Nav.Link href="/Login">Login</Nav.Link>}
          {cookies.get('LoggedIn') ? <Nav.Link href="/Logout">Logout</Nav.Link> : ""}
          {cookies.get('LoggedIn') ? "" : <Nav.Link href="/createAccount">CreateAccount</Nav.Link>}
          <Nav.Link href="/PostSomething">PostSomething</Nav.Link>
          {cookies.get('LoggedIn') ?<Nav.Link href="/Account">Account</Nav.Link>: ""}
        </Nav>
      </Container>
    </Navbar>
  )
}