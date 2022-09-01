import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {cookies} from "./App"
import {Link} from 'react-router-dom'

export default function Upload(){

    const [forms, setFormData] = useState({})
      const [data, setData] = useState([{"PostSMTH":{"id" : ''}}])
      const [error, setError] = useState(null)
      const [clicked, setClicked] = useState(false)
      const url = `http://127.0.0.1:8000`

    //Function that logs inputs into log in form fields
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(event.target.files)
        console.log(event.target.files)
    }
    console.log(forms[0])
    function handleSubmit(event) {
        event.preventDefault()
        console.log("Handeling submit")
        setClicked(true)
      }

      const formData = new FormData
      formData.append('file', forms[0])

    useEffect(() => {
        if(clicked ){
        console.log("Re rendering page")
            fetch(`${url}/posts/uploadfile`, {
            method: 'POST',
            body: formData
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

    console.log(data)
    return(<h1>
        <Form onSubmit={ handleSubmit}>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control type="file" onChange={handleChange}/>
      </Form.Group>
      <Button 
            variant="primary"
            type='submit'
            >
            Post
            </Button>
            </Form>
    </h1>)
}