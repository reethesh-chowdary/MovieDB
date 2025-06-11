import React, { use, useEffect, useState } from 'react';
import './EditMovie.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditMovie() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('status') !== 'true') {
            navigate('/signin');
        }
    },[navigate]);
    const [movie, setMovie] = useState({
        title: '',
        description: '',
        rating: '',
        year: '',
        genre: '',
        review: '',
        image_URL: ''
    });
    const {id} = useParams();
    async function fetchMovieDetails() {
        
            const response = await axios.get(`http://127.0.0.1:8000/movies/${id}/`);
            const movieData = await response.data;
            setMovie(movieData);
            console.log(movieData);
    }
    useEffect(() => {
        fetchMovieDetails();
    },[])
    async function onUpdate(e) {
    e.preventDefault();
    try {
        const response = await axios.put(`http://127.0.0.1:8000/movies/${id}/`, movie);
        if (response.status === 200) {
            alert("🎉 Movie updated successfully!");
            navigate(`/movies/${id}`);
        } else {
            alert("Failed to update the movie.");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

        
  return (
    <div>
        <h2>Edit Movie</h2>
        <form className="edit-movie-form">
            <label>
            Title:
            <input
                type="text"
                value={movie.title}
                onChange={(e) => setMovie({ ...movie, title: e.target.value })}
            />
            </label>
            <label>
            Rating:
            <input
                type="number"
                value={movie.rating}
                onChange={(e) => setMovie({ ...movie, rating: e.target.value })}
            />
            </label>
            <label>
            Year:
            <input
                type="number"
                value={movie.year}
                onChange={(e) => setMovie({ ...movie, year: e.target.value })}
            />
            </label>
            <label>
            Genre:
            <input
                type="text"
                value={movie.genre}
                onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
            />
            </label>
            <label>
            Review:
            <textarea
                value={movie.review}
                onChange={(e) => setMovie({ ...movie, review: e.target.value })}
            />
            </label>
            <label>
            Image URL:
            <input
                type="text"
                value={movie.image_URL}
                onChange={(e) => setMovie({ ...movie, image_URL: e.target.value })}
            />
            </label>
            <button type="submit" className='submit-button' onClick={onUpdate}>Update Movie</button>
        </form>
    </div>
  )
}

export default EditMovie