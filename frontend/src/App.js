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

export const cookies = new Cookies();

export const UserContext = createContext();

export default function App(){
    const [user, setUser] = useState({ loggedIn: cookies.get('LoggedIn') });

console.log(user)
 return (
    <UserContext.Provider value={{ user, setUser }}>
    <BrowserRouter>
    {console.log("hi")}
    <div className="App">
        <Container>
            <Routes>
                <Route path="/login" element={cookies.get('LoggedIn') ? <Navigate to="/AllPosts" replace /> :  <LoginHandle />}  />
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