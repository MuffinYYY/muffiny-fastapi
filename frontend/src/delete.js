import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from 'react-router-dom';
import {url} from "./config"

export default function Delete(){

  //Get data that was passed from last location, state was passed from account if delete button clicked
  const location = useLocation();

  //On first render the location.state can be null so we handle that exception
  var id
  if(location.state === null){
      id = 0
  }else{
      id = location.state.postId
  }

  //Boilerplate states
  const [data, setData] = useState([{'id': ''}])
  const [error, setError] = useState(null)
  const [response, setResponse] = useState({})
  
  //Send delete command to backend
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

  //If sucessfully or unsucessfully deletede return to account page
  if(response.status === 204 || response.status === 404){
      return(
          <Navigate to="/account" replace />
          )
  }
}