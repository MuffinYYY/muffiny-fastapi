import React from "react";
import Col from 'react-bootstrap/Col';

export default function OwnerInfo(props){
    return(
            <Col className="account-info" md={3}>
                <div className="account-info-email">
                    <p >{props.registered_at}</p>
                    <h3 >{props.email}</h3>
                </div>
            </Col>
    )
}