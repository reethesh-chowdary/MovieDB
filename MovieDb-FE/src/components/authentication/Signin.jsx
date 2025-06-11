import React from 'react';
import './auth.css'; // Import external CSS
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Signin = () => {

  const navigate = useNavigate();
  if (localStorage.getItem('status') === 'true') {
    navigate('/');
  }
  async function signinup(e) {
     e.preventDefault(); 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
      const response = await axios.post('http://127.0.0.1:8000/signin/', {
        username,
        password
      });
      // console.log(response.data);
      if (response.data.message = 'Signin successful.') {
        alert('Signin successful!');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        localStorage.setItem('status', 'true');
        navigate('/');
      } else {
        alert('Signin failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error during signin:', error);
      alert('An error occurred during signin. Please try again.');
    }
  }
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign In</h2>
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />

          <button type="submit" onClick={(e) => signinup(e)}>Sign In</button>

        </form>
        <p>
          Don’t have an account? <a onClick={()=>{navigate('/signup')}}>Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
