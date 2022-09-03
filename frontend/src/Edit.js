import React, { useState, useEffect, useRef } from "react";
import { useLocation, Navigate } from 'react-router-dom';
import Posts from './Posts'
import Button from 'react-bootstrap/Button';
import {cookies} from "./App"

export default function Edit(){
    const location = useLocation();
    const state = location.state
    const [clicked, setClicked] = useState(false)
    const url = `http://127.0.0.1:8000`
    const [data, setData] = useState([{'id': ''}])
    const [error, setError] = useState(null)
    const [response, setResponse] = useState({})
    const [File, setFile] = useState({})
    const [dataFile, setDataFile] = useState('')
    const [previewFile, setPreviewFile] = useState()
    const [uploadResponse, setUploadResponse] = useState()

    const inputRef = useRef(null);

    var id 
    if(location.state === null){
        id=0
    }else{
        id = location.state.postId
    }

    const [forms, setFormData] = useState({
        Title: state !== null ?`${state.title}` : "",
        baka: state !== null ? `${state.baka}`: "",
        ajusnevarat: state !== null ? `${state.ajusnevarat}` : "",
        path_name: state !== null ? `${state.path_name}` : ""
      })
    
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name] : value
        }))
    }

    function handleChangeFile(event) {
        setFile(event.target.files)
    }

    function handleSubmit(event) {
        console.log("Handeling submit")
        setClicked(true)
      }

    function handleClick ()  {
        inputRef.current.click();
    };

    const formData = new FormData
    if(File[0] !== undefined){
        formData.append('file', File[0])
    }

    useEffect(() => {
        if(clicked && File[0] !== undefined){
        console.log("Re rendering page to upload image")
            fetch(`${url}/posts/uploadfile`, {
            method: 'POST',
            credentials: 'include',
            body: formData
            })
            .then((response) => {
            setClicked(false)
            setUploadResponse(response.status)
            return response.json()
            })
            .then((actualData) => {
                setDataFile(actualData)
                setFormData(prevFormData => ({
                    ...prevFormData,
                    path_name:actualData
                }))
                setError(null)
            })
            .catch((err) => {
                setError(err.message)
                setDataFile(null)
                console.log(err.message)
            })
        }
        if(clicked){
            setDataFile(state.path_name)
        }
    }, [clicked])
    
    useEffect(() => {
        if(dataFile !== ""){
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
            }).then((actualData =>{
                console.log("response data :" + actualData)
            }))
            .catch((err) => {
                setError(err.message)
                setData(null)
                console.log(err.message)
            })
        }
    }, [dataFile])

    return(
        state !== null ? 
        <Posts
        key = {state.postId}
        title = {state.title}
        baka = {state.baka}
        editMode = {true}
        path_name = {state.path_name}
        handleInput = {handleChange}
        handleSecondClick = {handleClick}
        currentRef = {inputRef}
        handleImageUpload = {handleChangeFile}
        edit = {
            <Button variant="info" onClick={handleSubmit}>Edit post</Button>
        }
        /> :
        <Navigate to="/account" replace />
    )
}