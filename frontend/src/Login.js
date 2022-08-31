import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { serialize } from 'object-to-formdata'; //Library that simplifies serializng data to form-data
import FormElement from "./Components"
import {Link} from 'react-router-dom'
import {cookies, UserContext} from "./App"
import Container from 'react-bootstrap/esm/Container';

export default function LoginHandle() {

  const { user, setUser } = useContext(UserContext);

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [clicked, setClicked] = useState(false) //State that tracks Log in button state, whether it's clicked or not
  const [status, setStatus] = useState(null)

  const url = `http://127.0.0.1:8000`

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
      if(clicked ){
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
              cookies.set('LoggedIn', true, { path: '/', expires: new Date(Date.now()+1000000)});
              setUser({ loggedIn: true });
              
            }
            setStatus(response.status)
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

  //Render this on screen
  return (
    <Container className='login-container'>
      <Form onSubmit={handleSubmit}>
        <FormElement
          handleOnChange={handleChange}
          placeholder="Enter email"
          type="email"
          name="email"
          controlId="formBasicEmail"
          alert = {status === 403 ? true : false}
        />
        <FormElement
          handleOnChange={handleChange}
          placeholder="Password"
          type="password"
          name="password"
          controlId="formBasicPassword"
          alert = {status === 403 ? true : false}
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
        {status === 403 ? <p className='danger-alert'>Invalid credentials</p>: ""}
      </Form>
    </Container>
  );
}
