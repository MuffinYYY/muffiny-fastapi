import React from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export default function Posts(props){

    return(
        <Container className="post-card">
            <Card.Img variant="top" src="../troll.jpg" className="card-img"/>
            <h1 className="post-card-title">{props.title}</h1>
            <p>{props.description}</p>
            <h5>{props.owner}| Likes: {props.likes}</h5>
        </Container>
    )
}