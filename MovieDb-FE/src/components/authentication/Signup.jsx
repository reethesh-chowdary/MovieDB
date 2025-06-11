import React,{useState,useEffect} from 'react';
import './auth.css'; // Import external CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  async function signinginup(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
      const response = await axios.post('http://127.0.0.1:8000/signup/', {
        username,
        password
      });
      if (response.data.message = 'User created successfully.') {
        alert('Signup successful!');
        setIsLoggedIn(true);
        localStorage.setItem('status',true)
      } else {
        alert('Signup failed: ' + response.data.message);
      }
    
      console.error('Error during signup:', error);
      alert('An error occurred during signup. Please try again.');
    
  }
  useEffect(() => {
    
    if (localStorage.getItem('status') === 'true') {
      window.location.href = '/';
    }
  }, [isLoggedIn]);


  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create an Account</h2>
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />

          <button type="submit" onClick={signinginup}>Sign Up</button>
        </form>
        <p>
          Already have an account? <a onClick={()=>{navigate('/signin')}}>Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
