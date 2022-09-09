import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormElement from "./Components"
import {Link} from 'react-router-dom'
import {UserContext} from "./App"
import Container from 'react-bootstrap/esm/Container';
import { url, cookies } from "./config";

export default function LoginHandle() {

  //Boilerplate states
  const { user, setUser } = useContext(UserContext);
  const [clicked, setClicked] = useState(false) //State that tracks Log in button state, whether it's clicked or not
  const [status, setStatus] = useState(null)

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
    setClicked(true)
  }

  //Send login info to backend
  useEffect(() => {
    const userLogin = async () => {
      try{
        const result = await fetch(`${url}/login`, {
          method: 'POST',    
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(forms)
        })
        if(result.status !=='200'){
          setClicked(false)
        }if(result.status === 200){
          cookies.set('LoggedIn', true, { path: '/', expires: new Date(Date.now()+1000000)});
          setUser({ loggedIn: true }); //Update useContext that will reflect and refresh our App.js
          
        }
        setStatus(result.status)
      }catch(err){
        console.log(err)
      }
    }
    if(clicked ){
      userLogin()
    }
  }, [clicked])

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
