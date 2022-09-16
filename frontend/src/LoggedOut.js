import React, { useEffect, useContext } from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from "./App";
import { url, cookies } from "./config";
import { useMutation } from 'react-query';

export default function LoggedOut(){
  
  const { user, setUser } = useContext(UserContext);
  
  const userLogout = async () => {
    const result = await fetch(`${url}/logout`, {
      method: 'DELETE',    
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
    cookies.remove('LoggedIn', { path: '/' }); 
    cookies.remove('email', { path: '/' })
    setUser([{ loggedIn: cookies.get('LoggedIn') }, {loggedEmail: cookies.get("email")}]); //useContext set to not logged in, and it will update in our App.js
  }

  const {mutate} = useMutation(userLogout)

  useEffect(()=> {
    mutate()
  }, [])

  return(
    <>
      {cookies.get('LoggedIn') ? "" : <Navigate to="/" replace />}
    </>
  )
}