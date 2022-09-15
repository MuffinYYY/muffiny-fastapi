import React from "react";
import Posts from './Posts'
import Button from 'react-bootstrap/Button';
import {Link } from 'react-router-dom'
import { url } from "./config";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OwnerInfo from "./OwnerInfo";
import { useQuery } from "react-query";

export default function GetUser(){
    const getAccountInfo = async() =>{
        const result = await fetch(`${url}/posts/current`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
            })
        return result.json()
    }
    const {data, status} = useQuery('id', getAccountInfo)
    if(data !== undefined ){
        if(data[0] !== undefined){
        }
    }
return(
    <div>
    {status === 'error' && (
        <h1>Error fetching data</h1>
    )}

    {status === 'loading' && (
        <h1>Loading data...</h1>
    )}
    {status === 'success' && data !==undefined && data[0] !== undefined &&(
            <Row className="account">
                <Col className="owner-info-col" md={4}>
                    <OwnerInfo
                        email = {data[0].PostSMTH.owner.email }
                        registered_at = {data[0].PostSMTH.owner.created_at}
                        profile_img = {data[0].PostSMTH.owner.profile_img_path_name}
                    />
                </Col>
                <Col className="owner-allposts-col" md>
                    {
                        data.map(item =>{
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
                    }
                </Col>
                <Col sm></Col>
            </Row>  
    )}
    {status === 'success' && data[0] === undefined &&(
        <div>
            <h1>Uh oh, looks like you haven't posted anything</h1>
            <Link to='/PostSomething'>
                <Button>Post something</Button>
            </Link>
        </div>
    )}
    </div>
)
}