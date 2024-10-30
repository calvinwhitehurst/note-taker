import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    navigate('/'); // Redirect to login page
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      const response = await axios.get('http://localhost:3000/api/search', {
        params: { q: searchTerm } // Send the search term as a query parameter
      });
      setSearchResults(response.data); // Store the results in state
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <Link to="/home" className="btn btn-ghost normal-case text-xl">
          Encryptid
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="form-control">
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="input input-bordered" 
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="navbar-end">
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;