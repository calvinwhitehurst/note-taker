import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // To redirect the user after successful registration

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/register', { email, password });
      
      // If successful, redirect to the login page
      setMessage('Registration successful! You can now log in.');
      navigate('/login');
    } catch (error) {
      setMessage('Registration failed: ' + error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl mb-4">Register</h2>

          {/* Form */}
          <form onSubmit={handleRegister}>
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
              <button type="submit" className="btn btn-primary w-full">Register</button>
            </div>
          </form>

          {/* Display the message if registration fails or succeeds */}
          {message && <p className="text-center mt-4 text-error">{message}</p>}

          {/* Link to login */}
          <p className="text-center mt-4">
            Already have an account? <a href="/login" className="link link-primary">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;