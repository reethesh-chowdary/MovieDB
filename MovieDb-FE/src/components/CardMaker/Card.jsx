import React from 'react'
import './Card.css';
import { useNavigate } from 'react-router-dom';
function Card(props) {
  const navigate = useNavigate();
    const { movie } = props;
  return (
    <div onClick={() => navigate(`/movies/${movie.id}`)} className="card-container">
        <div className="movie-card">
            <img src={movie.image_URL} alt={movie.title} className="movie-image" />
            <div className="movie-content">
                <h3 className="movie-title">Title: {movie.title}</h3>
                <p className="movie-rating">Rating: {movie.rating}</p>
                <p className="movie-release">year: {movie.year}</p>
                <p className="movie-genre">Genre: {movie.genre}</p>
            </div>
        </div>
    </div>
  )
}

export default Card