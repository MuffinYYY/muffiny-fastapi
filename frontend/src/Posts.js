import React, { useState, useEffect, useRef } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { url } from "./config";

export default function Posts(props){

    //This allows to change our route
    let navigate = useNavigate(); 

    const routeChangeLogin = () =>{ 
      navigate(`/account`);
    }
    const routeChangeUser = () =>{ 
        navigate(`/user`, {state:props.ownerid});
    }

    //Boilerplate states
    const [clicked, setClicked] = useState(false)

    //Allows us to persist the same like value between rerenders
    const likes = useRef(props.likes);

    //Method to like post
    useEffect(() => {
        const likePost = async() =>{
            try{
                const result = await fetch(`${url}/vote`, {
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
                    if(result.status === 201){//If user hasn't liked add like
                        likes.current = likes.current + 1;
                    }else if (result.status === 200){ //If user has liked and pressed again remove like
                        likes.current = likes.current -1;
                    }else if (result.status === 401 || result.status === 422){ //If user isn't logged in and tries to like redirect to login page
                        routeChangeLogin()
                    }else{ //If no changes current likes stay the same
                        likes.current = likes.current;
                    }
            }catch(err){
                console.log(err)
            }
        }
        if(clicked){
            likePost()
        }
    }, [clicked])

    return(
        <Container className="post-card">

            {props.editMode ? 
            <>
            <Form>
                <div className="imageBox">
                    <div className="main-img">
                        <Card.Img 
                            variant="top" 
                            src={props.previewFile} 
                            className="card-img-edit"
                        />
                    </div>
                    <div className="hover-img">
                        <Card.Img
                            variant="top"
                            src="/edit-new-icon-22.png"
                            className="card-img-edit-hover"
                            onClick={props.handleSecondClick} 
                        />
                    </div>
                </div>
                <Form.Control 
                    type="file" 
                    style={{display: 'none'}} 
                    ref={props.currentRef} 
                    onChange={props.handleImageUpload} 
                    accept="image/png, image/jpeg"
                />
            </Form>
                <Form.Control 
                    placeholder={props.title}
                    name="Title"
                    className="text-area-title"
                    defaultValue={props.title}
                    onChange={props.handleInput}
                />
            </>
            :
            <>
                <Card.Img variant="top" src={`images/${props.path_name}`} className="card-img"/>
                <h1 className="post-card-title" >{props.title}</h1>
            </>
             } 
            
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