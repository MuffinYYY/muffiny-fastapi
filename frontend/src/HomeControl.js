import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { cookies,url } from "./config";
import { useQuery } from "react-query";
import { QueryCache } from 'react-query'
import { useNavigate } from "react-router-dom";

export default function HomeControl(){

    let navigate = useNavigate(); 

    const routeChangeHome = () =>{ 
      navigate(`/`);
    }

    const [responseCode, setResponseCode] = useState()
    const [message, setMessage] = useState()
    const [time, setTime] = useState()

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
            setMessage(message)
            const d = new Date();
            let timeUNIX = d.getTime();
            setTime(timeUNIX)
        }
        return () => ws.close();
    }, [])
    
return(
    <div className="serialBox">
        {status === 'loading' && (
            <h1>Loading data...</h1>
        )}
        {status === 'success' && responseCode !== 503 &&(
            <>

            </>
        )
        }
        {status === 'success' && responseCode === 503 &&(
            <>
                <h1>Logged in privilages: {role.role}</h1>
                <h1>Failed to establish serial connection </h1>
            </>
        )
        }
    </div>
)
}