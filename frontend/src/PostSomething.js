import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import { url, cookies } from "./config";
import {Link} from 'react-router-dom'

export default function PostSomething(){

    //Boilerplate states
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
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name] : value
        }))
    }

    //If any image is uploaded handle that change
    function handleChangeFile(event) {
        setFile(event.target.files)
        setPreviewFile(URL.createObjectURL(event.target.files[0]));
    }

    //If submmit button is pressed
    function handleSubmit(event) {
        event.preventDefault()
        setClicked(true)
      }

    //Make image as formdata because backend requires multipart/form-data
    const formData = new FormData()
    formData.append('file', File[0])
    
    //If button is clicked first upload image to our backend and as response get it's name that will l8r be passed in path_name row in our database
    useEffect(() => {
        if(clicked ){
            fetch(`${url}/posts/uploadfile`, {
            method: 'POST',
            credentials: 'include',
            body: formData
            })
            .then((response) => {
                setClicked(false)
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
    }, [clicked])

    //If datafile has changed send all submmited data to backend
    useEffect(() => {
        if(dataFile !== '' && cookies.get('LoggedIn')){
            fetch(`${url}/posts`, {
            method: 'POST',    
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(forms),
            })
            .then((response) => {
                setClicked(false)
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
        }
    }, [dataFile])

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