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

export default function App(){
 return (
    <BrowserRouter>
    <div className="App">
        <Container>
            <Routes>
                <Route path="/login" element={<LoginHandle />}/>
                <Route path="/createAccount" element={<CreateAccount />}/>
                <Route path="/AllPosts" element={<AllPosts />}/>
            </Routes>
        </Container>
    </div>
    </BrowserRouter>
 )
}