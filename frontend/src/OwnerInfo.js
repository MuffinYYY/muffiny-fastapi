import React, { useState, useEffect, useRef } from "react";
import {url} from "./config"
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function OwnerInfo(props){

    const [clicked, setClicked] = useState(false)
    const [data, setData] = useState([{'id': ''}])
    const [error, setError] = useState(null)
    const [response, setResponse] = useState({})
    const [File, setFile] = useState({})
    const [dataFile, setDataFile] = useState('')
    const [previewFile, setPreviewFile] = useState()
    const [uploadResponse, setUploadResponse] = useState()
    const [isShown, setIsShown] = useState(false);
    const [subbmitClicked, setSubbmitClicked] = useState(false)

    const inputRef = useRef(null);

    const [forms, setFormData] = useState({
        profile_img_path_name: props.profile_img !== null ? `${props.profile_img}` : ""
      })
    const formData = new FormData()
    if(File[0] !== undefined){
        formData.append('file', File[0])
    }

    function handleChangeFile(event) {
        event.preventDefault()
        setFile(event.target.files)
        setPreviewFile(URL.createObjectURL(event.target.files[0]));
    }

    //If we click to upload image, open file explorer
    function handleClick ()  {
        inputRef.current.click();
        setIsShown(true)
    }

    //When submmit button clicked set clicked state to true so that fetch api's can start to work
    function handleSubmit(event) {
        event.preventDefault()
        setClicked(true)
        setIsShown(false)
    }

    //Upload new image to backend server when submmit button clicked
     useEffect(() => {
        if(clicked === true){
            setClicked(false)
            fetch(`${url}/posts/uploadfile`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            .then((response) => {
                setUploadResponse(response.status)
                setClicked(false)
                console.log(response.status)
                return response.json()
            })
            .then((actualData) => {
                setDataFile(actualData)
                setFormData(prevFormData => ({
                    ...prevFormData,
                    profile_img_path_name:actualData
                }))
                setError(null)
            })
            .catch((err) => {
                setError(err.message)
                setDataFile(null)
                console.log(err.message)
            })
        }

    }, [clicked])
    console.log(dataFile)

    useEffect(() => {
        if(dataFile !== ""){
            fetch(`${url}/users/current`, {
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
    }, [dataFile])

    return(
            <Col className="account-info" md={3}>
                <div className="imageBox">
                    <div className="hover-img">
                        <Card.Img
                            variant="top"
                            src="/edit-new-icon-22.png"
                            className="card-img-edit-hover"
                            onClick={handleClick}
                            ref={inputRef} 
                        />
                    </div>
                        <Card.Img variant="top" src={`images/${props.profile_img}`} className="profile-img" />
                </div>
                    <Form.Control 
                        type="file" 
                        style={{display: 'none'}} 
                        ref={inputRef} 
                        onChange={handleChangeFile} 
                        accept="image/png, image/jpeg"
                    />
                    {isShown && 
                        <div>
                            <Button variant="info" onClick={handleSubmit}>Edit post</Button>
                        </div>
                    }
                    
                <div className="account-info-email">
                    <p >{props.registered_at}</p>
                    <h3 >{props.email}</h3>
                </div>
            </Col>
    )
}