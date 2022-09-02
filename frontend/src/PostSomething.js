import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import {cookies} from "./App"
import {Link} from 'react-router-dom'

export default function PostSomething(){
    const [data, setData] = useState([{"PostSMTH":{"id" : ''}}])
    const [dataFile, setDataFile] = useState('')
    const [error, setError] = useState(null)
    const [clicked, setClicked] = useState(false)
    const [formsFile, setFormFile] = useState({})

    const url = `http://127.0.0.1:8000`

    const [forms, setFormData] = useState({
        Title: "",
        baka: "",
        ajusnevarat: ""
      })
    
    //Function that logs inputs into log in form fields
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name] : value
        }))
    }

    function handleChangeFile(event) {
        setFormFile(event.target.files)
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log("Handeling submit")
        setClicked(true)
      }


      const formData = new FormData
      formData.append('file', formsFile[0])

    useEffect(() => {
        if(clicked ){
        console.log("Re rendering page to upload image")
            fetch(`${url}/posts/uploadfile`, {
            method: 'POST',
            credentials: 'include',
            body: formData
            })
            .then((response) => {
            console.log(response.status)
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

    useEffect(() => {
        if(dataFile !== '' && cookies.get('LoggedIn')){
        console.log("Re rendering page")
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
            console.log(response.status)
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

            <Form.Control type="file" onChange={handleChangeFile}/>
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