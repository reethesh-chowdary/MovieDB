import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const navigate = useNavigate();
  return (
    <div className='navbar'>
        <h1 onClick={()=>navigate('/')}>Movie Database</h1> 
        <nav>
          <ul>
            <li onClick={()=>navigate('/')}>Home</li>
            <li onClick={() => navigate('/add-movie')}>Add Movie</li>
            {localStorage.getItem('status') === 'true' ? (
              <li onClick={() => {
                localStorage.removeItem('status');
                navigate('/');
              }}>Logout</li>
            ) : (
             <li onClick={() => navigate('/signin')}>Login</li>
            )}
            
          </ul>
        </nav>
    </div>
  )
}

export default Navbar