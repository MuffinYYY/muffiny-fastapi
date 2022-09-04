import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from "./App";
import { url, cookies } from "./config";

export default function LoggedOut(){
  
  //Boilerplate states
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  
  //Send logout to backend
  useEffect(() => {
        fetch(`${url}/logout`, {
          method: 'DELETE',    
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        })
        .then((response) => {
          response.json()
          cookies.remove('LoggedIn', { path: '/' }); //Remove logged in cookie
          setUser({ loggedIn: cookies.get('LoggedIn') }); //useContext set to not logged in, and it will update in our App.js
        })
        .then((actualData) => {
            setData(actualData)
            setError(null)
        })
        .catch((err) => {
            setError(err.message)
            setData(null)
            console.log(err.message)
        })
  }, [])

  return(
    <>
      {cookies.get('LoggedIn') ? "" : <Navigate to="/" replace />}
    </>
  )
}