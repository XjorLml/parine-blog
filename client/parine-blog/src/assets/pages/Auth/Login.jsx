import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:8000/login', { email, password });

      // Check if login was successful
      if (!response.data.error) {
        // Save token to localStorage
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Navigate to home page
        navigate('/home');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="h-screen bg-cyan-50 overflow-hidden flex items-center justify-center">
      <div className="container h-screen flex items-center justify-center px-8 mx-auto">
        <div className="w-1/2 flex flex-col items-start">
          <h4 className="text-4xl font-bold mb-4">Welcome User!</h4>
          <p className="text-lg mb-8">Sign in to continue accessing your account.</p>
        </div>
        <div className="w-1/3 p-8 bg-white shadow-lg rounded-lg">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <h4 className="text-2xl font-semibold mb-6 text-center">Login</h4>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 mb-4 border rounded-lg focus:outline-none focus:border-cyan-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 mb-6 border rounded-lg focus:outline-none focus:border-cyan-500"
            />
            <button type="submit" className="w-full py-3 mb-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition">
              LOGIN
            </button>
            <p className="text-center text-gray-500 mb-4">OR</p>
            <button
              type="button"
              className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
              onClick={() => navigate('/register')}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
