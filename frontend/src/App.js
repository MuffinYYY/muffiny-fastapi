import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import LoginHandle from "./Login.js";
import CreateAccount from "./CreateAccount";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllPosts from "./AllPosts";
import LoggedOut from "./LoggedOut";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'universal-cookie';
import { createContext } from "react";
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Home from './Home';

export const cookies = new Cookies();

export const UserContext = createContext();

export default function App(){
    const [user, setUser] = useState({ loggedIn: cookies.get('LoggedIn') });
console.log(user)
 return (
    <UserContext.Provider value={{ user, setUser }}>
    <BrowserRouter>
    
    <div className="App">

      <Navbar expand="md py-3" variant="light" bg="light">
        <Container >
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Login">Login</Nav.Link>
            {cookies.get('LoggedIn') ? <Nav.Link href="/Logout">Logout</Nav.Link> : ""}
            {cookies.get('LoggedIn') ? "" : <Nav.Link href="/createAccount">CreateAccount</Nav.Link>}
            <Nav.Link href="/AllPosts">AllPosts</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

        <Container>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/createAccount" element={<CreateAccount />}/>
                <Route path="/login" element={cookies.get('LoggedIn') ? <Navigate to="/AllPosts" replace /> :  <LoginHandle />}  />
                <Route path="/AllPosts" element={cookies.get('LoggedIn') ?  <AllPosts/> :  <Navigate to="/login" replace />}/>
                <Route path="/logout" element={<LoggedOut />}/>
            </Routes>
        </Container>
    </div>
    </BrowserRouter>
    </UserContext.Provider>
 )
}