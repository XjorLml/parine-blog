import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Check if token exists
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return null;
  }

  return (
    <div className="h-screen bg-cyan-50 overflow-hidden flex items-center justify-center">
      <div className="container h-screen flex items-center justify-center px-8 mx-auto">
        <div className="w-1/2 flex flex-col items-start">
          <h4 className="text-4xl font-bold mb-4">Welcome Back!</h4>
          <p className="text-lg mb-8">You are logged in and ready to go.</p>
        </div>
        <div className="w-1/3 p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-semibold mb-6 text-center">Homepage</h1>
          <button 
            onClick={handleLogout} 
            className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
