import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate to other routes

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      const { token } = response.data;
      
      // Store the token in local storage
      localStorage.setItem('token', token);

      // Navigate to the protected home page after successful login
      setMessage('Login successful!');
      navigate('/home');
    } catch (error) {
      setMessage('Login failed: ' + error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl mb-4">Login</h2>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered"
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered"
              />
            </div>

            {/* Submit button */}
            <div className="form-control">
              <button type="submit" className="btn btn-primary w-full">Login</button>
            </div>
          </form>

          {/* Display the message if login fails or succeeds */}
          {message && <p className="text-center mt-4 text-error">{message}</p>}

          {/* Registration link */}
          <p className="text-center mt-4">
            Don't have an account? <Link to="/register" className="link link-primary">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
