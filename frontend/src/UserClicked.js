import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import { useLocation, Navigate } from 'react-router-dom';

export default function ClickedUser(){

    const [data, setData] = useState([{'id': ''}])
    const [error, setError] = useState(null)
    const [response, setResponse] = useState({})

    const url = `http://127.0.0.1:8000`

    const location = useLocation();
    var id
  
    if(location.state === null){
        id = 0
    }else{
        id = location.state
    }
    console.log(response)
    useEffect(() => {
        fetch(`${url}/posts/${id}`)
        .then((response) => {
            setResponse(response.status)
            return response.json()
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

    if(response == 400){
        return(
            <Navigate to="/" replace />
        )
    }
    const newArray = data.map(item =>{
        return (
            <Posts
            key = {item.id}
            title = {item.Title}
            baka = {item.baka}
            />
        )
        })
    return(
        <div>
            {newArray}
        </div>
    )
}