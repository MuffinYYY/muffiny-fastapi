import React from "react";
import FormElement from "./Components"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";

export default function CreateAccount(){

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [clicked, setClicked] = useState(false)
    const [status, setStatus] = useState(null)

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
    useEffect(() => {
        setStatus(0)
        if(clicked && forms.password === forms.ConfirmPassword && forms.password !== ""){
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
            if (response.status === 409){
              setStatus(response.status)
            }else if (response.status === 201){
              setStatus(response.status)
            }
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
        }else if (forms.password !== forms.ConfirmPassword){
          setStatus(406)
        }
        setClicked(false)
    }, [clicked])
    console.log(clicked)
    //Function that handle when submit is sent (button clicked)
    function handleSubmit(event) {
      event.preventDefault()
      console.log("Handeling submit")
      setClicked(true)
    }
console.log(status)
    return(
    <Container className="create-container">
      <Form onSubmit={handleSubmit}>
        <FormElement
          placeholder="Enter email"
          type="email"
          name="email"
          controlId="formBasicEmail"
          handleOnChange={handleChange}
          alert = {status === 409 ? true : false}
        />
        <FormElement
          placeholder="Password"
          type="password"
          name="password"
          controlId="formBasicPassword"
          handleOnChange={handleChange}
          alert = {status === 406 ? true : false}
        />
        <FormElement
          placeholder="Confirm password"
          type="password"
          name="ConfirmPassword"
          controlId="formBasicConfirmPassword"
          handleOnChange={handleChange}
          alert = {status === 406 ? true : false}
        />
        <Button 
        variant="primary"
        type="submit"
        >
          Create Account
        </Button>
        {status === 409 ? <p className='danger-alert'>User exists</p>: ""}
        {status === 406 ? <p className='danger-alert'>Passwords don't match</p>: ""}
      </Form>
    </Container>
    )

}