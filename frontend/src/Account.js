import React from "react";
import { useState, useEffect } from "react";
import Posts from './Posts'
import Button from 'react-bootstrap/Button';
import {Link, Navigate } from 'react-router-dom'

export default function GetUser(){

    const [data, setData] = useState([{"PostSMTH":{"id" : '', "owner": {}}}])
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
            key = {item.PostSMTH.id}
            postid = {item.PostSMTH.id}
            title = {item.PostSMTH.Title}
            baka = {item.PostSMTH.baka}
            likes = {item.likes}
            path_name = {item.PostSMTH.path_name}
            delete = {
                <Link 
                to={"/delete"}
                state={{postId: item.PostSMTH.id}}
                >
                    <Button variant="danger" >Delete post</Button>
                </Link>
            }
            edit = {
                <Link
                to={"/edit"}
                state={{
                    postId: item.PostSMTH.id,
                    title: item.PostSMTH.Title,
                    baka: item.PostSMTH.baka,
                    ajusnevarat: item.PostSMTH.ajusnevarat,
                    path_name: item.PostSMTH.path_name
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