import React, {useEffect} from "react";
import { useLocation, Navigate } from 'react-router-dom';
import {url} from "./config"
import { useMutation } from "react-query";

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

  const deletePost = async () => {
    console.log("delete post called")
    const result = await fetch(`${url}/posts/${id}`, {
      method: 'DELETE',    
      credentials: 'include',
    })
    return result.status
  }

  const { data: response,status,  mutate} = useMutation(deletePost)
  useEffect(()=>{
    mutate()
  }, [])
  console.log(status)
  //If sucessfully or unsucessfully deletede return to account page
  if(status === 'success'){
    return(
      <Navigate to="/account" replace />
    )
  }
  if(status === 'idle' || status === 'loading'){
    return(
      <h1>Deleting...</h1>
    )
  }

}