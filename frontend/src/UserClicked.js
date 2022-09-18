import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import { useLocation, Navigate, useParams } from 'react-router-dom';
import { url } from "./config";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OwnerInfo from "./OwnerInfo";
import { useQuery } from "react-query";

export default function ClickedUser(){
    let {id} = useParams()

    //If user doesn't exist
    if (id.match(/[^0-9\-_]/)){
        id = -1
    }
    
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
    return(
        <div>
            {status === 'error' && (
            <h1>Error fetching data</h1>
            )}

            {status === 'loading' && (
            <h1>Loading data...</h1>
            )}
            {status === 'success' && data.detail !=='Not selected user' && (
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
            {status === 'success' && data.detail ==='Not selected user' && (
                <h1>User doesn't exist</h1>
            )}
        </div>
    )
}