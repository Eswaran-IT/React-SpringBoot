import React, { useState } from 'react';
import Login from './Login'; 
import Register from './Register'; 
import Options from './Options';

function MainPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (loginData) => {
    fetch('http://localhost:9000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
    .then(response => {
      if (response.ok) {
        setIsLoggedIn(true); 
        setShowLogin(false);
        alert('Login successful!');
      } else {
        alert('Login failed. Please try again.');
      }
    })
    .catch(error => {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    });
  };

  const handleRegister = (registerData) => {
    fetch('http://localhost:9000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    })
    .then(response => {
      if (response.ok) {
        setIsLoggedIn(true); 
        setShowRegister(false);
        alert('Registration successful!');
      } else {
        alert('Registration failed. Please try again.');
      }
    })
    .catch(error => {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    });
  };
  
  return (
    <div className='bg-gray-200 h-full w-full'>
      {!isLoggedIn && (
        <div className='bg-white shadow-lg m- p-5 rounded-lg'>
          <h1 className='text-black font-bold text-3xl text-center'>Student Management</h1>
        </div>
      )}
      {isLoggedIn ? (
        <Options />
      ) : (
        <div className='flex flex-col md:flex-row justify-center bg-white m-3 rounded-lg shadow-lg p-10'>
          <div className='md:w-1/2 flex flex-col justify-center items-center'>
            <p className='p-2 m-3 text-3xl'>Let's Begin</p>
            <p className='p-2 m-2 text-xl'>Using React & SpringBoot</p>
            <div className=''>
              <button onClick={() => setShowLogin(true)} className='bg-red-500 m-1 p-3 text-white hover:bg-white hover:text-black font-lighter rounded-lg'>LOGIN</button>
              <button onClick={() => setShowRegister(true)} className='bg-red-500 m-1 p-3 text-white hover:bg-white hover:text-black font-lighter rounded-lg'>REGISTER</button>
            </div>
          </div>
          <div className='md:w-1/2'>
            <img className='w-full h-auto' src='./mainimg.jpg' alt='img' />
          </div>
        </div>
      )}
      {showLogin && <Login onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
      {showRegister && <Register onRegister={handleRegister} onClose={() => setShowRegister(false)} />}
    </div>
  );
}

export default MainPage;
