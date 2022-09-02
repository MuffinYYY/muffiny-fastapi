import React, { useState, useEffect, useRef } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import {cookies} from "./App"
export default function Posts(props){


    let navigate = useNavigate(); 
    const routeChangeLogin = () =>{ 
      navigate(`/account`);
    }
    const routeChangeUser = () =>{ 
        navigate(`/user`, {state:props.ownerid});
    }

    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [clicked, setClicked] = useState(false)
    const likes = useRef(props.likes);

    const url = `http://127.0.0.1:8000`

    useEffect(() => {
        if(clicked){
        console.log("Re rendering page")
            fetch(`${url}/vote`, {
            method: 'POST',    
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                "post_id" : props.postid,
                "vote_dir" : 1
            })
            })
            .then((response) => {
            setClicked(false)
                if(response.status === 201){
                    likes.current = likes.current + 1;
                }else if (response.status === 200){
                    likes.current = likes.current -1;
                }else if (response.status === 401 || response.status === 422){
                    routeChangeLogin()
                }else{
                    likes.current = likes.current;
                }
            return response.json()
            })
            .then((actualData) => {
                setData(actualData)
                console.log(data)
                setError(null)

            })
            .catch((err) => {
                setError(err.message)
                setData(null)
                console.log(err.message)
            })
        }
    }, [clicked])
    return(
        <Container className="post-card">
            <Card.Img variant="top" src={`images/${props.path_name}`} className="card-img"/>

            {props.editMode ? <Form.Control 
                placeholder={props.title}
                name="Title"
                className="text-area-title"
                defaultValue={props.title}
                onChange={props.handleInput}
            />:
            <h1 className="post-card-title" >{props.title}</h1> } 

            {props.editMode ? <Form.Control 
                as="textarea"
                placeholder={props.baka}
                name="baka"
                className="text-area-title"
                defaultValue={props.baka}
                onChange={props.handleInput}
            />:

            <p>{props.baka}</p>}
            <div className="user-likes">
                <h5 
                    className="owner-email" 
                    onClick={routeChangeUser}
                >Posted by: {props.owner}</h5>
            <Card.Img 
                variant="top" 
                src="../heart-icon.png" 
                className="heart-icon"
                onClick={()=> {
                    setClicked(true)
                }}
            />
                <h5>{likes.current}</h5>
            </div>

            <div>
                {props.delete}
                {props.edit}
            </div>
        </Container>
    )
}