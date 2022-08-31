import React, { useState, useEffect, useContext } from 'react';
import {cookies} from "./App"
import { Navigate } from "react-router-dom";
import { UserContext } from "./App";

export default function LoggedOut(){
  
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [clicked, setClicked] = useState(false) //State that tracks Log in button state, whether it's clicked or not

  const [loggedInState, setLoggedInState] = useState(false)
  
  const url = `http://127.0.0.1:8000`
    
  //send logout to API
  
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
          console.log(response.status)
          cookies.remove('LoggedIn', { path: '/' });
          setUser({ loggedIn: cookies.get('LoggedIn') });
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