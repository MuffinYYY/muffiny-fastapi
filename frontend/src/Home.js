import React from "react";
import { useState, useEffect } from "react";
import Posts from "./Posts"

export default function AllPosts(){
    const [data, setData] = useState([{"PostSMTH":{"id" : '', "owner": {}}}])
    const [error, setError] = useState(null)
    
    const url = `http://127.0.0.1:8000`

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

        const newArray = data.map(item =>{
        return (
            <Posts
            key = {item.PostSMTH.id}
            title = {item.PostSMTH.Title}
            baka = {item.PostSMTH.baka}
            owner = {item.PostSMTH.owner.email}
            likes= {item.likes}
            />
        )
        })

    return(
        <div>
            {newArray}
        </div>
    )
}