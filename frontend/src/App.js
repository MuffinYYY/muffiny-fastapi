import React from "react";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import FormExample from "./Form.js"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function App(){

 return (
    <div className="App">
        <Container>
            <FormExample/>
        </Container>
    </div>
 )
}