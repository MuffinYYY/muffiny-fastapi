import React from "react";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function OwnerInfo(props){
    console.log(props.profile_img)
    return(
            <Col className="account-info" md={3}>
                <Card.Img variant="top" src={props.profile_img} className="profile-img"/>
                <div className="account-info-email">
                    <p >{props.registered_at}</p>
                    <h3 >{props.email}</h3>
                </div>
            </Col>
    )
}