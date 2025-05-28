import React from 'react'
import './AddMovie.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function AddMovie() {
    const navigate = useNavigate();
    const [movie, setMovie] = useState({
        title: '',
        rating: '',
        year: '',
        genre: '',
        review: '',
        image_URL: ''
    });
    async function onAdd(e) {
        e.preventDefault();

        const response = await axios.post(`http://127.0.0.1:8000/movies/`, movie);
        console.log(response);
        if (response.status === 200) {
            alert("Movie added successfully!");
            navigate('/');
        } else {
            alert("Failed to add the movie.");
        }
    }
    return (
        <div>
            <h2>Add Movie</h2>
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
                <button type="submit" className='submit-button' onClick={onAdd}>Add Movie</button>
            </form>
        </div>
    )

}
export default AddMovie