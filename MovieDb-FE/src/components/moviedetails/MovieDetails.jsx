import React, { use } from 'react'
import './MovieDetails.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function MovieDetails() {
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const { id } = useParams();
    async function fetchMovieDetails() {
        console.log(5)
        const response = await axios.get(`http://127.0.0.1:8000/movies/${id}/`);

        const movieData = await response.data;

        setMovie(movieData);
    }
    useEffect(() => {
        fetchMovieDetails();
    }, [])
   async function onDelete() {
    try {
        const id = movie.id || movie._id; // use correct key based on your backend
        const response = await axios.delete(`http://127.0.0.1:8000/movies/${id}/`);
        
        if (response.status === 200) {
            alert("Movie deleted successfully!");
            navigate('/');
        } else {
            alert("Failed to delete the movie.");
        }
    } catch (error) {
        console.error("Delete Error:", error);
        alert("⚠️ An error occurred while deleting the movie.");
    }
}
    async function onEdit() {
        const id = movie.id || movie._id; // use correct key based on your backend
        navigate(`/edit-movie/${id}`);
    }
    return (
        <div>
            {movie ? (
                <div className="movie-details">
                    <div>
                        <img src={movie.image_URL} alt={movie.title} className="movie-image" />
                    </div>
                    <div>
                        <h2 className="movie-title">Title: {movie.title}</h2>
                        <p className="movie-description">{movie.description}</p>
                        <p className="movie-rating">Rating: {movie.rating}</p>
                        <p className="movie-release">Year: {movie.year}</p>
                        <p className="movie-genre">Genre: {movie.genre}</p>
                        <p className='movie-genre'>Review: {movie.review}</p>
                        <div>
                            <button className='edit-button' onClick={onEdit}>Edit</button>
                            <button className='delete-button' onClick={onDelete}>Delete</button>
                        </div>
                    </div>

                </div>
            ) : (
                <div className="loader"></div>
            )}
        </div>
    )
}

export default MovieDetails