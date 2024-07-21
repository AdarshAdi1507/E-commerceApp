import React, { useState } from 'react';
import axios from 'axios';  // Import Axios
import { useNavigate } from 'react-router-dom';

const Register = ({ role }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();  // Instance of useNavigate

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    // Validation logic for username
    if (newUsername && !/^[a-zA-Z\s]*$/.test(newUsername)) {
      setUsernameError('Username should contain only alphabetical characters');
    } else {
      setUsernameError('');
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // Validation logic for email
    if (newEmail && !/^\S+@\S+\.\S+$/.test(newEmail)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Validation logic for password
    if (newPassword && !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(newPassword)) {
      setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usernameError && !emailError && !passwordError && username && email && password) {
      try {
        // Make a POST request to your backend API
        const response = await axios.post('http://localhost:8080/users/registerUser', {
          username: username,
          email: email,
          password: password,
          userRole: role
        });
        console.log('Registration successful:', response.data);
        // Clear form fields
        setUsername('');
        setEmail('');
        setPassword('');
        // Redirect to Verify OTP page
        navigate('/verifyOTP'); // Ensure the route is correct
      } catch (error) {
        console.error('Error registering:', error);
      }
    } else {
      // Update error states if fields are empty
      if (!username) setUsernameError('Username is required');
      if (!email) setEmailError('Email is required');
      if (!password) setPasswordError('Password is required');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Create an account as {role}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={handleUsernameChange} 
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
          </div>
          <div className="mb-4">
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={handleEmailChange} 
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className="mb-6">
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={handlePasswordChange} 
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          </div>
          <button type="submit" className="w-full bg-yellow-500 text-white font-semibold py-2 rounded hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">Create your account</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
