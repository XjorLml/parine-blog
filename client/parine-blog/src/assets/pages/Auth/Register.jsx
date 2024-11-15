import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', // Add confirmPassword field
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format');
      return;
    }
  
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      // Send signup request to backend
      const response = await axios.post('http://localhost:8000/register', formData);
      if (!response.data.error) {  // Check for 'error' key instead of 'success'
        navigate('/login');
      } else {
        setError(response.data.message || 'Signup failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };
  

  return (
    <div className="h-screen bg-cyan-50 flex items-center justify-center">
      <div className="w-1/3 p-8 bg-white shadow-lg rounded-lg">
        <h4 className="text-2xl font-semibold mb-6 text-center">Sign Up</h4>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="p-3 mb-4 border rounded-lg focus:outline-none focus:border-cyan-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 mb-4 border rounded-lg focus:outline-none focus:border-cyan-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 mb-4 border rounded-lg focus:outline-none focus:border-cyan-500"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="p-3 mb-6 border rounded-lg focus:outline-none focus:border-cyan-500"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition"
          >
            REGISTER
          </button>
          <p className="text-center mt-4">
            Already have an account?{' '}
            <span
              className="text-cyan-500 cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
