import React, { useState, useEffect, useRef } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { url } from "./config";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Upload(){

  //Practice file

    const [formsFile, setFormFile] = useState({})
      const [data, setData] = useState([{"PostSMTH":{"id" : ''}}])
      const [error, setError] = useState(null)
      const [clicked, setClicked] = useState(false)
      const [file, setFile] = useState();

      const inputRef = useRef(null);

    //Function that logs inputs into log in form fields
    function handleChangeFile(event) {
        const {name, value} = event.target
        setFormFile(event.target.files)
        console.log(event.target.files)
        setFile(URL.createObjectURL(event.target.files[0]));
    }
    console.log(formsFile[0])
    function handleSubmit(event) {
        event.preventDefault()
        console.log("Handeling submit")
        setClicked(true)
      }

      const formData = new FormData()
      formData.append('file', formsFile[0])
      
      console.log(inputRef)
      const handleClick = () => {
        inputRef.current.click();
      };

      useEffect(() => {
        if(clicked ){
        console.log("Re rendering page")
            fetch(`${url}/posts/uploadfile`, {
            method: 'POST',
            credentials: 'include',
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
    return (
      <Container className="account">
      <Row>
        <Col className="account-info-posts" md={{ span: 4, offset: 0 }}>md=4</Col>
        <Col className="account-info-posts" md={{ span: 4, offset: 0 }}>{`md={{ span: 4, offset: 4 }}`}</Col>
      </Row>
      <Row>
      </Row>
      <Row>
      </Row>
    </Container>
    );
}
