import React, { useState, useEffect, useRef } from "react";
import {url} from "./config"
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useMutation } from "react-query";
import {cookies} from "./config"

export default function OwnerInfo(props){

    const [File, setFile] = useState({})
    const [previewFile, setPreviewFile] = useState()
    const [isShown, setIsShown] = useState(false);

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
        mutate()
        setIsShown(false)
    }

    const uploadFile = async () => {
        const result = await fetch(`${url}/posts/uploadfile`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            const data = await result.json()

            return data
    }

    const uploadData = async (data) => {
        const result = await fetch(`${url}/users/current`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },    
            credentials: 'include',
            body: JSON.stringify(
                {
                    ...forms,
                    profile_img_path_name:data
                }
            )
            })
    }

    const { mutate } = useMutation(uploadFile, {
        onSuccess: (data) => {
            mutateAsync(data)
          }

    })
    const { mutateAsync } = useMutation(uploadData)

    function dateFormat(registered_at){
        const formated_time = registered_at.replace(/[\-]/g,'/').replace(/[T]/g, ' ').slice(0, -13) + ' '
        return formated_time
    }
    
    //Conditionally handle when hovered
    const [isHover, setIsHover] = useState(false);

    const hoverImgStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: isHover && cookies.get('LoggedIn') && props.email === cookies.get('email') ? 'flex' : 'none',
        cursor : 'pointer'
    }

    function handleMouseEnter(){
        setIsHover(true)
    }
    function handleMouseLeave(){
        setIsHover(false)
    }
    return(
        <div className="owner-info">
                <div className="imageBox">
                    <div 
                    onMouseEnter = {handleMouseEnter}
                    onMouseLeave = {handleMouseLeave}>
                        <img
                            style={hoverImgStyle}    
                            variant="top"
                            src="/edit-new-icon-22.png"
                            className="card-img-edit-hover"
                            onClick={handleClick}
                            ref={inputRef} 
                        />
                    </div>
                        <div
                        onMouseEnter = {handleMouseEnter}
                        onMouseLeave = {handleMouseLeave}>
                            <Card.Img variant="top" src={`/images/${props.profile_img}`} className="profile-img" />
                        </div>
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
                    <p >{dateFormat(props.registered_at)}</p>
                    <p >{props.email}</p>
                </div>
        </div>
    )
}