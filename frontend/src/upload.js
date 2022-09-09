import React, { useState, useEffect, useRef } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { url } from "./config";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Upload(){

  //Practice file
      console.log("Setting states")

      const [formsFile, setFormFile] = useState({})
      const [clicked, setClicked] = useState(false)
      const [file, setFile] = useState();

      const inputRef = useRef(null);

    //Function that logs inputs into log in form fields
    function handleChangeFile(event) {
        const {name, value} = event.target
        setFormFile(event.target.files)
        setFile(URL.createObjectURL(event.target.files[0]));
    }
    function handleSubmit(event) {
        event.preventDefault()
        console.log("Handeling submit")
        setClicked(true)
      }

      const formData = new FormData()
      formData.append('file', formsFile[0])
      
      const handleClick = () => {
        inputRef.current.click();
        console.log("Handle click")
      };

      useEffect(() => {
        async function asyncCall(){
          try{
            const result = await fetch(`${url}/posts/uploadfile`, {
              method: 'POST',
              credentials: 'include',
              body: formData
            })
            const data = await result.json();
            return console.log(data)
            }
            catch (err) {
              console.log(err)
            }
        }
        if(clicked ){
          asyncCall()
        }
    }, [clicked])


    return (
      <button onClick={handleSubmit}></button>
    );
}
