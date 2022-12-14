import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { cookies,url } from "./config";
import { useQuery } from "react-query";
import { QueryCache } from 'react-query'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function HomeControl(){

    let navigate = useNavigate(); 

    const routeChangeHome = () =>{ 
      navigate(`/`);
    }

    const [responseCode, setResponseCode] = useState()
    const [message, setMessage] = useState("")

    const getAccountInfo = async() =>{
        const result = await fetch (`${url}/users/current`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const data = await result.json()
        if(data.role !== 'admin'){
            routeChangeHome()
        }
        return data
    }
    
    const getSerialData = async() =>{
        const result = await fetch (`${url}/serial/`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if (result.status === 503){
            setResponseCode(result.status)
        }
        return result.json()
    }

    const {data : role } = useQuery('role', getAccountInfo)
    const {data : serial, status} = useQuery('serial', getSerialData, {
        enabled: !!role && role.role === 'admin' //Doesn't run getSerial query until first query is finished and role is equall to admin
    })

    useEffect(() => {
        const ws = new WebSocket(`ws://127.0.0.1:8000/serial/ws`);
        ws.onopen = () => {
        console.log("WebPage Connection Established!")
        }

        ws.onmessage = (event) => {
            const message = event.data;
            setMessage(JSON.parse(message)) //Parsing to JSON serial data
        }
        return () => ws.close();
    }, [])

    const [ledState, setLedState] = useState('current')

    const changeLed = async() =>{
        const result = await fetch (`http://192.168.8.51/led/${ledState}`)
        return result.json()
    }
    const {data : espdata, refetch, isFetching} = useQuery(['esp', ledState], changeLed, {
        refetchOnWindowFocus: false,
        })

    function toggleLED(){
        if(espdata.LED_state === 'true'){
            setLedState(false)
        }
        if(espdata.LED_state === 'false'){
            setLedState(true)
        }
        refetch()
    }

return(
    <div className="dataBox">
        <div className="controlBox">
            <h1>Control LED</h1>
            <img className="ledButton" onClick={toggleLED} src={ledState ? "../led-on.png" : "../led-off.png"} ></img>
        </div>
        {status === 'loading' && (
            <h1>Loading data...</h1>
        )}
        {status === 'success' && responseCode !== 503 &&(
            <div className="serialBox">
                <h1>Logged in privilages: {role.role}</h1>
                <h3>Current battery voltage: {message.voltage} V</h3>
                <h3>Current altitude: {message.altitude} m</h3>
                <h3>Pitch: {message.pitch}</h3>
                <h3>Roll: {message.roll}</h3>
                <h3>Yaw: {message.yaw}</h3>
            </div>
        )
        }
        {status === 'success' && responseCode === 503 &&(
            <div className="serialBox">
                <h1>Logged in privilages: {role.role}</h1>
                <h1>Failed to establish serial connection </h1>
            </div>
        )
        }
    </div>
)
}