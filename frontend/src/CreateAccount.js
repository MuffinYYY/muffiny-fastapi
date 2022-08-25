import React from "react";
import FormElement from "./Components"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";

export default function CreateAccount(){

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [clicked, setClicked] = useState(false)
    const url = `http://127.0.0.1:8000`

    //State that tracks input field
    const [forms, setFormData] = useState({
        email: "",
        password: "",
        ConfirmPassword: ""
    })
    //Function that logs inputs into log in form fields
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name] : value
        }))
    }
    console.log(JSON.stringify(forms.email))

    useEffect(() => {
        if(clicked && forms.password === forms.ConfirmPassword){
        console.log("rendered")
            fetch(`${url}/users`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(forms)
                
            })
            .then((response) => {
            response.json()
            console.log(response.status)
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

    //Function that handle when submit is sent (button clicked)
    function handleSubmit(event) {
      event.preventDefault()
      console.log("Handeling submit")
      setClicked(true)
    }

    return(
    <Form onSubmit={handleSubmit}>
      <FormElement
        placeholder="Enter email"
        type="email"
        name="email"
        controlId="formBasicEmail"
        handleOnChange={handleChange}
      />
      <FormElement
        placeholder="Password"
        type="password"
        name="password"
        controlId="formBasicPassword"
        handleOnChange={handleChange}
      />
      <FormElement
        placeholder="Confirm password"
        type="password"
        name="ConfirmPassword"
        controlId="formBasicConfirmPassword"
        handleOnChange={handleChange}
      />
      <Button 
      variant="primary"
      type="submit"
       >
        Create Account
      </Button>
    </Form>
    )

}