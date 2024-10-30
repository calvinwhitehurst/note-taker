import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to Our App</h1>
            <p className="py-6">
              Discover amazing features and start your journey with us. Our application helps you manage everything efficiently and effectively.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/register">
                <button className="btn btn-primary">Get Started</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-secondary">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card shadow-lg">
              <div className="card-body">
                <h3 className="card-title">Feature One</h3>
                <p>Detailed description of feature one. It’s awesome and will change the way you work.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card shadow-lg">
              <div className="card-body">
                <h3 className="card-title">Feature Two</h3>
                <p>Explanation of feature two and how it helps users achieve their goals effortlessly.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card shadow-lg">
              <div className="card-body">
                <h3 className="card-title">Feature Three</h3>
                <p>Why this feature stands out and is valuable to your potential customers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <div>
          <p>© 2024 Our App, Inc.</p>
        </div>
        <div>
          <Link to="/register" className="link link-hover">Register</Link>
          <Link to="/login" className="link link-hover">Login</Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;