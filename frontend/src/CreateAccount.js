import React, { useState, useEffect } from "react";
import FormElement from "./Components"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";
import {url} from "./config"
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

export default function CreateAccount(){

  //This allows to change our route
  let navigate = useNavigate(); 

  const routeChangeLogin = () =>{ 
      navigate(`/login`);
  }

    const [status, setStatus] = useState()

    //State that tracks input field
    const [forms, setFormData] = useState({
        email: "",
        password: "",
        ConfirmPassword: ""
    })

    //Function that logs inputs when input changes and saves it in state
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name] : value
        }))
    }

    //Function that handle when submit is sent (button clicked)
    function handleSubmit(event) {
      event.preventDefault()
      console.log("Handeling submit")
      if(forms.password === forms.ConfirmPassword && forms.password !== ""){
        mutate()
      }else if (forms.password !== forms.ConfirmPassword){
        setStatus(406)
      }
    }

    const createAccount = async () => {
      const result = await fetch(`${url}/users`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(forms)
        }) 
        return result.status
    }

    const { data: response,  mutate} = useMutation(createAccount)

    //Redirect if successful account create
    useEffect(()=>{
      if(response === 201){
        routeChangeLogin()
      }
    }, [response])
    
    return(
    <Container className="create-container">
      <Form onSubmit={handleSubmit}>
        <FormElement
          placeholder="Enter email"
          type="email"
          name="email"
          controlId="formBasicEmail"
          handleOnChange={handleChange}
          alert = {response === 409 ? true : false}
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
          {response === 409 ? <p className='danger-alert'>User exists</p>: ""}
          {status === 406 ? <p className='danger-alert'>Passwords don't match</p>: ""}
      </Form>
    </Container>
    )
}