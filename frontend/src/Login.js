import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { serialize } from 'object-to-formdata'; //Library that simplifies serializng data to form-data
import FormElement from "./Components"
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "./App";


export default function LoginHandle() {


  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [clicked, setClicked] = useState(false) //State that tracks Log in button state, whether it's clicked or not

  const url = `http://127.0.0.1:8000`

  const { user, setUser } = useContext(UserContext);
  console.log("llogin")
  //State that tracks input field
  const [forms, setFormData] = useState({
    email: "",
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
      if(clicked && user.loggedIn === false){
        console.log("Re rendering page")
          fetch(`${url}/login`, {
            method: 'POST',    
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(forms)
          })
          .then((response) => {
            if(response.status !=='200'){
              setClicked(false)
            }if(response.status === 200){
              console.log("HTTP response code: " + response.status)
              setUser({ loggedIn: true });
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
      }
  }, [clicked])
  //Function that handle when submit is sent (button clicked)
  function handleSubmit(event) {
    event.preventDefault()
    console.log("Handeling submit")
    setClicked(true)
  }

  if(data !== null){
    console.log(data.access_token)
  }
  //Render this on screen
  return (
      <Form onSubmit={handleSubmit}>
        <FormElement
          handleOnChange={handleChange}
          placeholder="Enter email"
          type="email"
          name="email"
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
        type='submit'
        >
          Log in
        </Button>
        <Link to='/CreateAccount'>
          <Button>Create account</Button>
        </Link>
        <Link to='/logout'>
          <Button>LogOut</Button>
        </Link>
      </Form>
  );
}
