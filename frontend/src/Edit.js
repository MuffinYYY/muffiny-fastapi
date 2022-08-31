import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from 'react-router-dom';
import Posts from './Posts'
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

    var id = location.state.postId

    const [forms, setFormData] = useState({
        Title: state !== null ?`${state.title}` : "",
        baka: state !== null ? `${state.baka}`: "",
        ajusnevarat: state !== null ? `${state.ajusnevarat}` : ""
      })
    
    //Function that logs inputs into log in form fields
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name] : value
        }))
    }

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

    return(
        state !== null ? 
        <Posts
        key = {state.postId}
        title = {state.title}
        baka = {state.baka}
        editMode = {true}
        handleInput = {handleChange}
        edit = {
            <Button variant="info" onClick={handleSubmit}>Edit post</Button>
        }
        /> :
        <Navigate to="/account" replace />
    )
}