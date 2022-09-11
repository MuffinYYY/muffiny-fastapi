import React, { useState, useEffect, useRef } from "react";
import { useLocation, Navigate } from 'react-router-dom';
import Posts from './Posts'
import Button from 'react-bootstrap/Button';
import {url} from "./config"
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export default function Edit(){
    
    //Boilerplate states/location from account with passed state, location allows to access passed state's
    const location = useLocation();
    const state = location.state

      //This allows to change our route
    let navigate = useNavigate(); 

    const routeChangeAccount = () =>{ 
      navigate(`/Account`);
    }

    const [File, setFile] = useState({})
    const [previewFile, setPreviewFile] = useState()

    //Allows us to persist values between renders
    const inputRef = useRef(null);
    
    //On first render the location.state can be null so we handle that exception
    var id 
    if(location.state === null){
        id=0
    }else{
        id = location.state.postId
    }

    //Forms state on first render can be null, so if it is we replace with empty string untill it loads the last state
    const [forms, setFormData] = useState({
        Title: state !== null ?`${state.title}` : "",
        baka: state !== null ? `${state.baka}`: "",
        ajusnevarat: state !== null ? `${state.ajusnevarat}` : "",
        path_name: state !== null ? `${state.path_name}` : ""
      })
    
    //Handle changes that happen when we write into forms
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name] : value
        }))
    }

    //Handle new file upload
    function handleChangeFile(event) {
        setFile(event.target.files)
        setPreviewFile(URL.createObjectURL(event.target.files[0]));
    }

    //If we click to upload image, open file explorer
    function handleClick ()  {
        inputRef.current.click();
    }

    //When submmit button clicked set clicked state to true so that fetch api's can start to work
    function handleSubmit() {
        mutate()
    }

    //Make uploaded file as formdata only when it's uploaded otherwise we will use last image
    const formData = new FormData()
    formData.append('file', File[0])

    const uploadFile = async () => {
        if (File[0] !== undefined){
        const result = await fetch(`${url}/posts/uploadfile`, {
            method: 'POST',
            credentials: 'include',
            body: formData
            })
            const data = await result.json()

            return data
        }
        return forms.path_name
    }

    const editData = async (data) =>{
        const result = await fetch(`${url}/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },    
                credentials: 'include',
                body: JSON.stringify(
                    {
                        ...forms,
                        path_name:data
                    }
                )
            })
        return result.status
    }
    
    const { mutate } = useMutation(uploadFile, {
        onSuccess: (data) => {
            mutateAsync(data)
          }

    })
    const { mutateAsync } = useMutation(editData, {
        onSuccess: (result) => {
            routeChangeAccount()
        }
    })

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
            previewFile = {previewFile ? previewFile : `images/${state.path_name}`}
            currentRef = {inputRef}
            handleImageUpload = {handleChangeFile}
            edit = {
                <Button variant="info" onClick={handleSubmit}>Edit post</Button>
            }
        /> :
        <Navigate to="/account" replace />
    )
}