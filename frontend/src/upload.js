import React, { useState, useEffect, useRef } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { url } from "./config";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useQuery} from 'react-query'

export default function Upload(){
  return (
    <Container className="test-container">
      <Row className="test-row-1">
        <Col className="test-col-1" sm></Col>
        <Col className="test-col-4" sm>sm=true</Col>
        <Col className="test-col-2" sm>sm=4</Col>
      </Row>

    </Container>
  );
    
}
