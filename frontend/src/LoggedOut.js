import React from 'react';
import { useState, useEffect } from "react";
import {cookies} from "./App"
import {Link} from 'react-router-dom'
import { Navigate, Outlet } from "react-router-dom";

export default function LoggedOut(){
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [clicked, setClicked] = useState(false) //State that tracks Log in button state, whether it's clicked or not

  const [loggedInState, setLoggedInState] = useState(false)
  
  const url = `http://127.0.0.1:8000`
    
  //send logout to API
  useEffect(() => {
      console.log("Re rendering page")
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
          if(response.status !='200')
            setClicked(false)
          console.log("HTTP response code: " + response.status)
          cookies.remove('LoggedIn', { path: '/' });
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