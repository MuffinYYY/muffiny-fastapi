import React, {useContext, useEffect} from "react";
import Posts from './Posts'
import Button from 'react-bootstrap/Button';
import {Link } from 'react-router-dom'
import { cookies, url } from "./config";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OwnerInfo from "./OwnerInfo";
import {roleContext} from "./App"
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export default function GetUser(){
    const { role, setRole } = useContext(roleContext);

    let navigate = useNavigate(); 

    const routeChangeLogin = () =>{ 
      navigate(`/login`);
    }

    const getPostInfo = async() =>{
        const result = await fetch(`${url}/posts/current`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
            })
        return result.json()
    }
    const getAccountInfo = async() =>{
        const result = await fetch (`${url}/users/current`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if(result.status === 200){
            setRole('lol'); //Update useContext that will reflect and refresh our App.js
        }
        return result.json()
    }
    const {data, status} = useQuery('id', getPostInfo)
    const {data : accData} = useQuery('role', getAccountInfo)
    
    console.log(data)

return(
    <div>
    {status === 'error' && (
        <h1>Error fetching data</h1>
    )}

    {status === 'loading' && (
        <h1>Loading data...</h1>
    )}
    {status === 'success' && data !==undefined && data[0] !== undefined&& accData !==undefined && cookies.get('LoggedIn') &&(
            <Row className="account">
                <Col className="owner-info-col" md={4}>
                    <OwnerInfo
                        email = {accData.email }
                        registered_at = {accData.created_at}
                        profile_img = {accData.profile_img_path_name}
                        role = {accData.role}
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