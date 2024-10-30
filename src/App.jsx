import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import Navbar from './components/Navbar';
import LandingPage from './LandingPage';

//ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the user is logged in
  return token ? children : <Navigate to="/login" />; // Redirect to login if no token
};

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/register' && location.pathname !== '/login' && location.pathname !== '/' && <Navbar />}
      <Routes>
        {/* Public Route: Landing Page */}
        <Route path='/' element={<LandingPage />} />
        {/* Public route: login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Public route: registration page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected route: only accessible if the user is authenticated */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <HomePage /> {/* This is the protected content */}
            </ProtectedRoute>
          }
        />

        {/* Redirect to login if user tries to access the root */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
)
export default AppWrapper;
