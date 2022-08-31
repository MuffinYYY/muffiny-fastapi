import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import {cookies} from "./App"
import {Link} from 'react-router-dom'

export default function PostSomething(){
    const [data, setData] = useState([{"PostSMTH":{"id" : ''}}])
    const [error, setError] = useState(null)
    const [clicked, setClicked] = useState(false)
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

    function handleSubmit(event) {
        event.preventDefault()
        console.log("Handeling submit")
        setClicked(true)
      }

    useEffect(() => {
        if(clicked && cookies.get('LoggedIn')){
        console.log("Re rendering page")
            fetch(`${url}/posts`, {
            method: 'POST',    
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(forms)
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
    }, [clicked])

    return(
        <Container className='post-area'>
        <Form onSubmit={cookies.get('LoggedIn')? handleSubmit : <Link to='/login'/>}>
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