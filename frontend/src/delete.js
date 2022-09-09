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

  //Keep track of response code
  const [response, setResponse] = useState({})
  
  //Send delete command to backend
  useEffect(() => {
    async function deletePost(){
      try{
        const result = await fetch(`${url}/posts/${id}`, {
          method: 'DELETE',    
          credentials: 'include',
        })
        setResponse(result.status)
      }catch(err){
        console.log(err)
      }
    }
    deletePost()
  }, [])

  //If sucessfully or unsucessfully deletede return to account page
  if(response === 204 || response === 404){
    return(
      <Navigate to="/account" replace />
    )
  }
}