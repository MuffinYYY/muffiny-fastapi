import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import { useLocation, Navigate } from 'react-router-dom';
import { url } from "./config";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OwnerInfo from "./OwnerInfo";
import { useQuery } from "react-query";

export default function ClickedUser(){
    const location = useLocation();
    var id
    if(location.state === null){
        id = 0
    }else{
        id = location.state
    }
    console.log("id "+id)

    const getAccountInfo = async() =>{
        const result = await fetch(`${url}/posts/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
            })
        return result.json()
    }
    const {data, status} = useQuery('postid', getAccountInfo, {
        cacheTime: 1,
      })
    console.log(status)

    return(
        <div>
            {status === 'error' && (
            <h1>Error fetching data</h1>
            )}

            {status === 'loading' && (
            <h1>Loading data...</h1>
            )}
            {status === 'success' && (
                <Row className="account">
                    <Col className="owner-info-col" md={4}>
                        <OwnerInfo
                            email = {data[0].PostSMTH.owner.email}
                            registered_at = {data[0].PostSMTH.owner.created_at}
                            profile_img = {data[0].PostSMTH.owner.profile_img_path_name }
                        />
                    </Col>
                    <Col className="owner-allposts-col" md>
                        {data.map(item =>{
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
                        })}
                    </Col>
                    <Col></Col>
                </Row>
            )}
        </div>
    )
}