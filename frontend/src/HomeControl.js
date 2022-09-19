import React from "react";
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
        const result = await fetch (`${url}/serial`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        return result.json()
    }

    const {data : role } = useQuery('role', getAccountInfo)
    const {data : serial, status} = useQuery('serial', getSerialData, {
        enabled: !!role && role.role === 'admin' //Doesn't run getSerial query until first query is finished and role is equall to admin
    })
return(
    <div>
        {status === 'loading' && (
            <h1>Loading data...</h1>
        )}
        {status === 'success' && (
            <>
                <h1>Logged in privilages: {role.role}</h1>
                <h1>Port number: {serial.name}</h1>
            </>
        )}
    </div>
)
}