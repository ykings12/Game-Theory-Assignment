import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../styles/App.css'; // Import your CSS here
import backgroundImage from '../utils/background.jpg'; // Ensure the import path is correct

const formStyle = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  width: '320px',
  textAlign: 'center',
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '15px',
};

const labelStyle = {
  marginBottom: '5px',
  fontWeight: 'bold',
};

const inputStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  width: '100%',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '30px',
  padding: '20px',
  minHeight: '100vh',
};

const appStyle = {
  minHeight: '100vh',
  backgroundImage: `url(${backgroundImage})`, // Set the background image
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};

const LoginRegisterPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  // State variables for input fields
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });

  // For displaying success or error messages
  const [loginMessage, setLoginMessage] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');

  // Handling Login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginMessage(''); // Reset message
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (response.ok) {
        // Store token in localStorage and redirect to the CentersPage
        localStorage.setItem('token', data.token); // Assuming your backend sends a token
        setLoginMessage('Login Successful!');
        navigate('/dashboard'); // Navigate to /dashboard after login
        console.log('Login Successful', data);
      } else {
        // Display error message
        setLoginMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setLoginMessage('Network Error. Please try again later.');
      console.log('Network Error:', error);
    }
  };

  // Handling Register form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterMessage(''); // Reset message
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      if (response.ok) {
        setRegisterMessage('Registration Successful! You can now login.');
        console.log('Registration Successful', data);
      } else {
        // Display error message
        setRegisterMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setRegisterMessage('Network Error. Please try again later.');
      console.log('Network Error:', error);
    }
  };

  return (
    <div style={appStyle}>
      <div style={containerStyle}>
        <div style={formStyle}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                style={inputStyle}
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                style={inputStyle}
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            </div>
            <button type="submit" style={buttonStyle}>Login</button>
          </form>
          {loginMessage && <p>{loginMessage}</p>} {/* Display login message */}
        </div>

        <div style={formStyle}>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                style={inputStyle}
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                style={inputStyle}
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                style={inputStyle}
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
            </div>
            <button type="submit" style={buttonStyle}>Register</button>
          </form>
          {registerMessage && <p>{registerMessage}</p>} {/* Display register message */}
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
