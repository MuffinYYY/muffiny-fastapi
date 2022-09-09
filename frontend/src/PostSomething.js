import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import { url, cookies } from "./config";
import {Link} from 'react-router-dom'

export default function PostSomething(){

    //Boilerplate states
    console.log("State change")
    const [data, setData] = useState([{"PostSMTH":{"id" : ''}}])
    const [dataFile, setDataFile] = useState('')
    const [error, setError] = useState(null)
    const [clicked, setClicked] = useState(false)
    const [File, setFile] = useState({})
    const [previewFile, setPreviewFile] = useState()

    //Input form state
    const [forms, setFormData] = useState({
        Title: "",
        baka: "",
        ajusnevarat: ""
      })
    
    //Function that logs changes and adds to our form state
    function handleChange(event) {
        event.preventDefault()
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name] : value
        }))
    }

    //If any image is uploaded handle that change
    function handleChangeFile(event) {
        event.preventDefault()
        setFile(event.target.files)
        setPreviewFile(URL.createObjectURL(event.target.files[0]));
    }

    //If submmit button is pressed
    function handleSubmit(event) {
        event.preventDefault()
        console.log("submmit handle")
        setClicked(true)
      }

    //Make image as formdata because backend requires multipart/form-data
    const formData = new FormData()
    formData.append('file', File[0])
    
    //If button is clicked first upload image to our backend and as response get it's name that will l8r be passed in path_name row in our database
    useEffect(() => {
        const uploadFile = async () => {
            try{
                const result = await fetch(`${url}/posts/uploadfile`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                    })
                const data = await result.json()
                console.log("data "+data)
                setFormData(prevFormData => ({
                    ...prevFormData,
                    path_name:data
                }))
                console.log("after prevformdata")
            }catch(err){
                console.log(err)
            }
            postSomething()
        }

        const postSomething = async () => {
            try{
                console.log("before postsomething")
                const result = await  fetch(`${url}/posts`, {
                    method: 'POST',    
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(forms),
                    })
                    console.log(forms)
            }catch(err){
                console.log(err)
            }
        }

        if(clicked ){
            uploadFile()
            console.log("Run UploadFile")
        }
    }, [clicked])

    return(
        <Container className='post-area'>
        <Form onSubmit={cookies.get('LoggedIn')? handleSubmit : <Link to='/login'/>}>

            <Form.Control type="file" onChange={handleChangeFile}  accept="image/png, image/jpeg"/>
            <div className="preview-div">
                {previewFile ? <img src={previewFile} className="card-img"/> : ""}
            </div>
            <Form.Control 
                placeholder="Title"
                name="Title"
                className="text-area-title"
                onChange={handleChange}
             />
            <Form.Control
                as="textarea"
                name="baka"
                placeholder="Leave a description here"
                className="text-area-description"
                style={{ height: '100px' }}
                onChange={handleChange}
            />
            <Form.Control 
                name="ajusnevarat"
                placeholder="ajnusnevarat(int)"
                className="text-area-title"
                type="number"
                onChange={handleChange}
                />
            <Button 
            variant="primary"
            type='submit'
            >
            Post
            </Button>
        </Form>
    </Container>
    )
}