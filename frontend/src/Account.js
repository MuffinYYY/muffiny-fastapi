import React from "react";
import { useState, useEffect } from "react";
import Posts from './Posts'
import Button from 'react-bootstrap/Button';
import {Link, Navigate } from 'react-router-dom'

export default function GetUser(){

    const [data, setData] = useState([{'id': ''}])
    const [error, setError] = useState(null)
    const [id, setId] = useState(null)
    const [response, setResponse] = useState(null)

    const url = `http://127.0.0.1:8000`

    useEffect(() => {
            fetch(`${url}/posts/current`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
            })
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
    if(response === 422){
        return(
            <Navigate to="/login" replace />
        )
    }

    const newArray = data.map(item =>{
        return (
            <Posts
            key = {item.id}
            title = {item.Title}
            baka = {item.baka}
            delete = {
                <Link 
                to={"/delete"}
                state={{postId: item.id}}
                >
                    <Button variant="danger" >Delete post</Button>
                </Link>
            }
            edit = {
                <Link
                to={"/edit"}
                state={{
                    postId: item.id,
                    title: item.Title,
                    baka: item.baka,
                    ajusnevarat: item.ajusnevarat
                    }}
                >
                    <Button variant="info" >Edit post</Button>
                </Link>
            }
            />
        )
        })

    return(
        <div>
            {newArray}
        </div>
    )
}