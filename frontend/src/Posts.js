import React from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Posts(props){

    return(
        <Container className="post-card">
            <Card.Img variant="top" src="../troll.jpg" className="card-img"/>

            {props.editMode ? <Form.Control 
                placeholder={props.title}
                name="Title"
                className="text-area-title"
                defaultValue={props.title}
                onChange={props.handleInput}
            />:
            <h1 className="post-card-title" >{props.title}</h1> } 

            {props.editMode ? <Form.Control 
                as="textarea"
                placeholder={props.baka}
                name="baka"
                className="text-area-title"
                defaultValue={props.baka}
                onChange={props.handleInput}
            />:
            <p>{props.baka}</p>}

            <h5>{props.owner}| Likes: {props.likes}</h5>
            <div>
                {props.delete}
                {props.edit}
            </div>
        </Container>
    )
}