import React from "react";
import { useState, useEffect } from "react";

export default function GetUser(){

    const [data, setData] = useState([{"PostSMTH":{"id" : '', "owner": {}}}])
    const [error, setError] = useState(null)
    
    const url = `http://127.0.0.1:8000`

    useEffect(() => {
            fetch(`${url}/users/current`, {
                credentials: 'include'}
            )
            .then((response) => {
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

    console.log(data)
    return(
        <div>
        <h1>{data.email}</h1>
        <h1>{data.created_at}</h1>
        </div>
    )
}