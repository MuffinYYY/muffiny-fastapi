import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from "./App";
import { url, cookies } from "./config";

export default function LoggedOut(){
  
  //Boilerplate states
  const { user, setUser } = useContext(UserContext);
  
  //Send logout to backend
  useEffect(() => {
    const userLogout = async () => {
      try{
        const result = await fetch(`${url}/logout`, {
          method: 'DELETE',    
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        })
        cookies.remove('LoggedIn', { path: '/' }); //Remove logged in cookie
        setUser({ loggedIn: cookies.get('LoggedIn') }); //useContext set to not logged in, and it will update in our App.js
      }catch(err){
        console.log(err)
      }
    }
    userLogout()
  }, [])

  return(
    <>
      {cookies.get('LoggedIn') ? "" : <Navigate to="/" replace />}
    </>
  )
}