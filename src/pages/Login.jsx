import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/'); // Go home after login
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Login error", err);
    }
  };

  return (
    <div className="flex h-screen w-screen  bg-mist-300">


      <form onSubmit={handleLogin} className="flex  flex-col  p-8 bg-white
      gap-5 items-center w-170
      
      dark:bg-gray-900 mt-10 mx-auto h-120    
      rounded-3xl border border-gray-100 dark:border-gray-800 shadow-2xl">
      <h2 className="text-3xl font-black mb-6 dark:text-white">Welcome Back</h2>
        
          <input 
            type="email" 
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white border-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white border-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-40  py-6  mt-7 bg-gray-900 dark:bg-blue-600 text-white font-bold  rounded-xl hover:scale-[1.02] transition-transform">
            Sign In
          </button>
      </form>
    </div>
  );
};

export default Login;