import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { Navigate } from "react-router-dom";

export default function Delete(){

  const location = useLocation();
  var id

  if(location.state === null){
      id = 0
  }else{
      id = location.state.postId
  }

  const [data, setData] = useState([{'id': ''}])
  const [error, setError] = useState(null)
  const [response, setResponse] = useState({})
  
  const url = `http://127.0.0.1:8000`

  useEffect(() => {
        console.log("Re rendering page")
          fetch(`${url}/posts/${id}`, {
            method: 'DELETE',    
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'include',
          })
          .then((response) => {
            setResponse(response)
          })
          .catch((err) => {
              setError(err.message)
              setData(null)
              console.log(err.message)
          })

          
  }, [])
  console.log(response.status)
  if(response.status === 204 || response.status === 404){
      return(
          <Navigate to="/account" replace />
          )
  }
}