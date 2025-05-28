import React from 'react'
import './GetAll.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from '../CardMaker/Card'
function GetAll() {
  
    const [movieData,setMovieData] = useState([]);
    async function preview() {
            const response = await axios.get('http://127.0.0.1:8000/movies/');
            const movies = await response.data;
            setMovieData(movies);
        }
         
        useEffect(() => {
          preview(); 
            console.log(movieData);
        }, []);
  return (
    <div className='main'>
      <h4>Movies Preview</h4>
      <div className='allCards'>
        {movieData.length > 0 ? (
        <div className='movie-list'>
          {movieData.map((i) => (
            <Card key={i.id} movie={i} />
          ))}
        </div>
      ) : <div className="loader"></div> }
      </div>
    </div>
  )
  }

export default GetAll