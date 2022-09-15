import React, { useState } from "react";
import Posts from "./Posts"
import { url } from "./config";
import { useQuery } from "react-query";
import Spinner from 'react-bootstrap/Spinner';

export default function AllPosts(){

    //Getting all posts
    const getAllPosts = async () =>{
        const res = await fetch(`${url}/posts/all`, {
            credentials: 'include'})
        return res.json()
    }
    const {data, status} =  useQuery('id', getAllPosts)

    function dateFormat(posted_at){
        const formated_time = posted_at.replace(/[\-]/g,'/').replace(/[T]/g, ' ').slice(0, -13) + ' '
        return formated_time
    }
      
    return(
        <div>
            {status === 'error' && (
            <h1>Error fetching data</h1>
            )}

            {status === 'loading' && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
            {status === 'success' && (
                <>
                    {data.map(item =>{
                    return (
                        <Posts
                            key = {item.PostSMTH.id}
                            ownerid = {item.PostSMTH.owner_id}
                            postid = {item.PostSMTH.id}
                            title = {item.PostSMTH.Title}
                            baka = {item.PostSMTH.baka}
                            owner = {item.PostSMTH.owner.email}
                            likes= {item.likes}
                            state={{ownerId: item.PostSMTH.owner_id}}
                            path_name = {item.PostSMTH.path_name}
    
                            posted_at = {dateFormat(item.PostSMTH.posted_at)}
                        />
                    )
                    })}
                </>
            )}
        </div>
    )
}