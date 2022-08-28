import React from "react";
import Form from 'react-bootstrap/Form';

export default function FormElement(props){
  const style = {borderColor : props.alert? "red": "black"}
  
    return(
      <Form.Group className="mb-3" controlId={props.controlId}>
        <Form.Control style={style} type={props.type} placeholder={props.placeholder} onChange={props.handleOnChange} name={props.name}/>
      </Form.Group>
    )
}