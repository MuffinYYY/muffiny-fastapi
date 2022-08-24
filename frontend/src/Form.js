import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { serialize } from 'object-to-formdata'; //Library that simplifies serializng data to form-data
import FormElement from "./Components"

export default function FormExample(props) {

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [clicked, setClicked] = useState(false)

  const url = `http://127.0.0.1:8000`

  //State that tracks input field
  const [forms, setFormData] = useState({
    username: "",
    password: ""
  })

  //Function that logs inputs into log in form fields
  function handleChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => ({
        ...prevFormData,
        [name] : value
    }))
  }

  //Function that serializes JS object to Form-data
  function toFormData(){
    return serialize(forms)
  }

  //send log in info to API
  useEffect(() => {
      if(clicked){
        console.log("rendered")
          fetch(`${url}/login`, {
            method: 'POST',    
            body: toFormData()
              
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

  function handleSubmit(event) {
    event.preventDefault()
    console.log("hi")
}

  //Render this on screen
  return (
    <Form >
      <FormElement
        handleOnChange={handleChange}
        placeholder="Enter email"
        type="email"
        name="username"
        controlId="formBasicEmail"
      />
      <FormElement
        handleOnChange={handleChange}
        placeholder="Password"
        type="password"
        name="password"
        controlId="formBasicPassword"
      />
      <Button 
      variant="primary"
      onClick={() => {
         setClicked(true)
        }
        }
       >
        Log in
      </Button>

    </Form>
  );
}
