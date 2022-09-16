import React, { useState,  useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormElement from "./Components"
import {Link} from 'react-router-dom'
import {UserContext} from "./App"
import Container from 'react-bootstrap/esm/Container';
import { url, cookies } from "./config";
import { useMutation } from 'react-query';

export default function LoginHandle() {

  //Boilerplate states
  const { user, setUser } = useContext(UserContext);

  //State that tracks input field
  const [forms, setFormData] = useState({
    email: "",
    assword: ""
  })

  //Function that updates form state based on changes in forms
  function handleChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => ({
        ...prevFormData,
        [name] : value
    }))
  }

  //Function that handle when submit is sent (button clicked)
  function handleSubmit(event) {
    event.preventDefault() //Prevents page reload when submmit sent
    mutate()
  }
  
  const userLogin = async () =>{
    const result = await fetch(`${url}/login`, {
      method: 'POST',    
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(forms)
    })
    if(result.status === 200){
      cookies.set('LoggedIn', true, { path: '/', expires: new Date(Date.now()+1000000)});
      cookies.set('email', forms.email, { path: '/', expires: new Date(Date.now()+1000000)});
      setUser([{ loggedIn: true },{loggedEmail : forms.email}]); //Update useContext that will reflect and refresh our App.js
    }
    return result.status
  }

  const { data: response,  mutate} = useMutation(userLogin)
  
  return (
    <Container className='login-container'>
      <Form onSubmit={handleSubmit}>
        <FormElement
          handleOnChange={handleChange}
          placeholder="Enter email"
          type="email"
          name="email"
          controlId="formBasicEmail"
          alert = {response === 403 ? true : false}
        />
        <FormElement
          handleOnChange={handleChange}
          placeholder="Password"
          type="password"
          name="password"
          controlId="formBasicPassword"
          alert = {response === 403 ? true : false}
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
        {response === 403 ? <p className='danger-alert'>Invalid credentials</p>: ""}
      </Form>
    </Container>
  );
}
