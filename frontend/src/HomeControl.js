import React from "react";
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";

export default function HomeControl(){
const {id} = useParams()
console.log(id)
return(
    <div>
        <h1>lol {id}</h1>
    </div>
)
}