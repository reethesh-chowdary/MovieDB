import React from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GetAll from './components/mainpage/GetAll.jsx'
import MovieDetails from './components/moviedetails/MovieDetails.jsx'
import EditMovie from './components/editing/EditMovie.jsx'
import AddMovie from './components/adding/AddMovie.jsx'
import Signup from './components/authentication/Signup.jsx'
import Signin from './components/authentication/Signin.jsx'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<GetAll />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/edit-movie/:id" element={<EditMovie />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App