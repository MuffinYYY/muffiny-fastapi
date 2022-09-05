import React, { useState, useEffect } from "react";
import Posts from './Posts'
import Button from 'react-bootstrap/Button';
import {Link, Navigate } from 'react-router-dom'
import { url } from "./config";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OwnerInfo from "./OwnerInfo";

export default function GetUser(){

    //States that are required 
    const [data, setData] = useState([{"PostSMTH":{"id" : '', "owner": {}}}])
    const [error, setError] = useState(null)
    const [response, setResponse] = useState(null)

    //Fetch data from backend
    useEffect(() => {
            fetch(`${url}/posts/current`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
            })
            .then((response) => {
                setResponse(response.status)
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
    }, [])

    //Deal with response error if user isn't logged in
    if(response === 422){
        return(
            <Navigate to="/login" replace />
        )
    }
    
    //Map over each array that is returned as response from backend and pass as props
    const newArray = data.map(item =>{
        return (
            <Posts
                key = {item.PostSMTH.id}
                postid = {item.PostSMTH.id}
                title = {item.PostSMTH.Title}
                baka = {item.PostSMTH.baka}
                likes = {item.likes}
                path_name = {item.PostSMTH.path_name}
                delete = {
                    <Link 
                    to={"/delete"}
                    state={{postId: item.PostSMTH.id}}
                    >
                        <Button variant="danger" >Delete post</Button>
                    </Link>
                }
                edit = {
                    <Link
                    to={"/edit"}
                    state={{
                        postId: item.PostSMTH.id,
                        title: item.PostSMTH.Title,
                        baka: item.PostSMTH.baka,
                        ajusnevarat: item.PostSMTH.ajusnevarat,
                        path_name: item.PostSMTH.path_name
                        }}
                    >
                        <Button variant="info" >Edit post</Button>
                    </Link>
                }
            />
        )
    })
    //Return each post
    return(
        <Container className="account">
            <Row>
                <OwnerInfo
                    email = {data[0] !== undefined ? data[0].PostSMTH.owner.email : ""}
                    registered_at = {data[0] !== undefined ? data[0].PostSMTH.owner.created_at : ""}
                    profile_img = {data[0] !== undefined ? data[0].PostSMTH.owner.profile_img_path_name : "profile_default.jpg"}
                />
                <Col className="account-info-posts" md={{ span: 6, offset: 0 }}>
                    {newArray}
                </Col>
            </Row>
        </Container>
    )
}