import React from "react";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoginHandle from "./Login.js";
import CreateAccount from "./CreateAccount";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllPosts from "./AllPosts";
import LoggedOut from "./LoggedOut";
import { createContext, useState, useReducer} from "react";
import { Navigate, Outlet } from "react-router-dom";
import {  useEffect } from "react";
import {log} from "./Login"

export const UserContext = createContext();

export default function App(){

    const [user, setUser] = useState({ loggedIn: false });

 return (
<UserContext.Provider value={{ user, setUser }}>
    <BrowserRouter>
    <div className="App">
        <Container>
            <Routes>
                <Route path="/login" element={user.loggedIn ? <Navigate to="/AllPosts" replace /> :  <LoginHandle />}  />
                <Route path="/createAccount" element={<CreateAccount />}/>
                <Route path="/AllPosts" element={<AllPosts />}/>
                <Route path="/logout" element={<LoggedOut />}/>
            </Routes>
        </Container>
    </div>
    </BrowserRouter>
    </UserContext.Provider>
    
 )
}