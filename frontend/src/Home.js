import React, { useState, useEffect } from "react";
import Posts from "./Posts"
import { url } from "./config";

export default function AllPosts(){

    //Boilerplate states
    const [data, setData] = useState([{"PostSMTH":{"id" : '', "owner": {}}}])
    const [error, setError] = useState(null)
    
    //Method to get all posts from backend
    useEffect(() => {
            fetch(`${url}/posts/all`, {
                credentials: 'include'}
            )
            .then((response) => {
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
        
    //Map over each returned array and pass values from it as states, to our Posts component
    const newArray = data.map(item =>{
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
    })

    return(
        <div>
            {newArray}
        </div>
    )
}