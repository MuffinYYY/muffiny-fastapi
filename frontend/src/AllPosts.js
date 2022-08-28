import React from "react";
import { useState, useEffect } from "react";
import Posts from "./Posts"
import {Link} from 'react-router-dom'
import { Navigate, Outlet } from "react-router-dom";

export default function AllPosts(){
    const [data, setData] = useState([{"PostSMTH":{"id" : ''}}])
    const [error, setError] = useState(null)
    
    const url = `http://127.0.0.1:8000`

    console.log(data)

    useEffect(() => {
          console.log("Re rendering page")
            fetch(`${url}/posts/all`, {
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

        const newArray = data.map(item =>{
            console.log(item.PostSMTH.Title)
        return (
            <Posts
            key = {item.PostSMTH.id}
            title = {item.PostSMTH.Title}
            description = {item.PostSMTH.baka}
            />
        )
        })
    return(
        <div>
            {newArray}
        </div>
    )
}