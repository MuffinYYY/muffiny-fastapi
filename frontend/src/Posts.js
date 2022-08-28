import React from "react";
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';

export default function Posts(props){

    return(
        <Container className="post-card">
            <Card.Img variant="top" src="../troll.jpg" className="card-img"/>
            <h1 className="post-card-title">{props.title}</h1>
            <p>{props.description}</p>
        </Container>
    )
}