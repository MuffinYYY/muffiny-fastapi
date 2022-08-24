import React from "react";
import Form from 'react-bootstrap/Form';

export default function FormElement(props){
    return(
      <Form.Group className="mb-3" controlId={props.controlId}>
        <Form.Control type={props.type} placeholder={props.placeholder} onChange={props.handleOnChange} name={props.name}/>
      </Form.Group>
    )
}