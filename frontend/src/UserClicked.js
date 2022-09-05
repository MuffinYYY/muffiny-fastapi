import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import { useLocation, Navigate } from 'react-router-dom';
import { url } from "./config";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OwnerInfo from "./OwnerInfo";

export default function ClickedUser(){

    //Boilerplate states
    const [data, setData] = useState([{"PostSMTH":{"id" : '', "owner": {}}}])
    const [error, setError] = useState(null)
    const [response, setResponse] = useState({})

    const location = useLocation();
    var id
  
    if(location.state === null){
        id = 0
    }else{
        id = location.state
    }

    //Send to backend to fetch data about user we just clicked on
    useEffect(() => {
        fetch(`${url}/posts/${id}`)
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

    if(response === 400){
        return(
            <Navigate to="/" replace />
        )
    }

    //Map over response (we got specified user's all posts) and return them individually 
    const newArray = data.map(item =>{
        return (
            <Posts
                key = {item.PostSMTH.id}
                postid = {item.PostSMTH.id}
                title = {item.PostSMTH.Title}
                baka = {item.PostSMTH.baka}
                likes = {item.likes}
                path_name = {item.PostSMTH.path_name}
            />
        )
        })
    return(
        <Container className="account">
            <Row>
                <OwnerInfo
                    email = {data[0].PostSMTH.owner.email}
                    registered_at = {data[0].PostSMTH.owner.created_at}
                    profile_img = {data[0] !== undefined ? data[0].PostSMTH.owner.profile_img_path_name : "profile_default.jpg"}
                />
                <Col className="account-info-posts" md={{ span: 6, offset: 0 }}>
                    {newArray}
                </Col>
            </Row>
        </Container>
    )
}