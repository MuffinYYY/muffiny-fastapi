import React, { useState, createContext } from "react";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import LoginHandle from "./Login.js";
import CreateAccount from "./CreateAccount";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PostSomething from "./PostSomething";
import LoggedOut from "./LoggedOut";
import Home from './Home';
import NavbarCustom from './Navbar'
import GetUser from "./Account";
import Delete from "./delete";
import Edit from "./Edit"
import ClickedUser from "./UserClicked";
import Upload from "./upload";
import {cookies} from "./config"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

//Allows to manage state globally, we can set from different file for example that user is logged in
export const UserContext = createContext();
export const UserContextEmail = createContext();

const queryClient = new QueryClient()

export default function App(){
    const [user, setUser] = useState([{ loggedIn: cookies.get('LoggedIn') }, {loggedEmail : cookies.get('email')}]);
 return (
    <UserContext.Provider value={{ user, setUser }}>
    <BrowserRouter>
    
    <div className="App">
    <NavbarCustom/> 
        <QueryClientProvider client={queryClient}>
            <Container>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/createAccount" element={<CreateAccount />}/>
                    <Route path="/login" element={cookies.get('LoggedIn') ? <Navigate to="/" replace /> :  <LoginHandle />}  />
                    <Route path="/PostSomething" element={cookies.get('LoggedIn') ?  <PostSomething/> :  <Navigate to="/login" replace />}/>
                    <Route path="/logout" element={<LoggedOut /> } />
                    <Route path="/Account" element={cookies.get('LoggedIn') ?  <GetUser/> :  <Navigate to="/login" replace />} />
                    <Route path="/delete" element={cookies.get('LoggedIn') ?  <Delete/> :  <Navigate to="/login" replace /> } />
                    <Route path="/edit" element={cookies.get('LoggedIn') ?  <Edit/> :  <Navigate to="/login" replace /> } />
                    <Route path="/user" element={<ClickedUser /> } />
                    <Route path="/upload" element={<Upload/>}/>
                </Routes>
                </Container>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </div>
    </BrowserRouter>
    </UserContext.Provider>
 )
}