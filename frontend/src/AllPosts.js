import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";


export default function AllPosts(){
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
  
    const url = `http://127.0.0.1:8000`

    useEffect(() => {
          console.log("Re rendering page")
            fetch(`${url}/posts/all`, {
                credentials: 'include'}
            )
            .then((response) => response.json())
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

    if(data !== null){
        console.log(data)
    }

    return(
        <h1>hi</h1>
    )
}