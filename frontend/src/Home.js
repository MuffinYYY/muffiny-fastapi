import React, { useState } from "react";
import Posts from "./Posts"
import { url } from "./config";
import { useQuery } from "react-query";

export default function AllPosts(){

    //Getting all posts
    const getAllPosts = async () =>{
        const res = await fetch(`${url}/posts/all`, {
            credentials: 'include'})
        return res.json()
    }
    const {data, status} =  useQuery('id', getAllPosts)
      
    return(
        <div>
            {status === 'error' && (
            <h1>Error fetching data</h1>
            )}

            {status === 'loading' && (
            <h1>Loading data...</h1>
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
                        />
                    )
                    })}
                </>
            )}
        </div>
    )
}