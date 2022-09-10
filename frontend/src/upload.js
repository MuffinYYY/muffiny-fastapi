import React, { useState, useEffect, useRef } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { url } from "./config";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useQuery} from 'react-query'

export default function Upload(){

  const fetchPlanets = async (page) => {
    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`)
    return res.json()
  }
    const [page, setPage] = useState(1)
    const {data, status} =  useQuery(['planets', page], () => fetchPlanets(page), {
      keepPreviousData: true,
    })
    console.log(data)

    return (
      <div>
        <h1>StarWars planets</h1>

        {status === 'error' && (
          <h1>Error fetching data</h1>
        )}

        {status === 'loading' && (
          <h1>Loading data...</h1>
        )}

        {status === 'success' && (
          <>
          <button onClick={() =>setPage(prevPage => !data || !data.next ? prevPage : prevPage+1)}>YoYoYo</button>
          
          {data.results.map(item =>{
            return (
              <div key={item.name}>{item.name}</div>
            )
          })}
          </>

        )}
      </div>
    )
}
