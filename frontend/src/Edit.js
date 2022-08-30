import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { Navigate } from "react-router-dom";
import Posts from './Posts'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';

export default function Edit(){
    const location = useLocation();
    const state = location.state
    const [edit, setEdit] = useState(false)
    const [clicked, setClicked] = useState(false)
    const url = `http://127.0.0.1:8000`
    const [data, setData] = useState([{'id': ''}])
    const [error, setError] = useState(null)
    const [response, setResponse] = useState({})

    var id
    
    if(location.state === null){
       <h1>hi</h1>
    }else{
        id = location.state.postId
    }

    const [forms, setFormData] = useState({
        Title: `${state.title}`,
        baka: `${state.baka}`,
        ajusnevarat: `${state.ajusnevarat}`
      })
    
    //Function that logs inputs into log in form fields
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name] : value
        }))
    }
    console.log(forms)

    function handleSubmit(event) {
        event.preventDefault()
        console.log("Handeling submit")
        setClicked(true)
      }


    useEffect(() => {
        if(clicked === true){
        console.log("Re rendering page")
            fetch(`${url}/posts/${id}`, {
            method: 'PUT',    
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(forms)
            })
            .then((response) => {
            setResponse(response)
            })
            .catch((err) => {
                setError(err.message)
                setData(null)
                console.log(err.message)
            })
        }
    }, [clicked])

  console.log(response.status)
    return(
        <Posts
        key = {state.postId}
        title = {state.title}
        baka = {state.baka}
        editMode = {true}
        handleInput = {handleChange}
        edit = {
            <Button variant="info" onClick={handleSubmit}>Edit post</Button>
        }
        />
    )
}