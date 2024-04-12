export default function Login() {

    // Import React modules
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Define the Login component
const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login button click
  const handleLogin = () => {
    loginWithRedirect();
  };

  // Function to handle changes in username/email/phone input
  const handleIdInput = (event) => {
    setUsername(event.target.value);
  };

  // Function to handle changes in password input
  const handlePwInput = (event) => {
    setPassword(event.target.value);
  };

  // Function to enable/disable login button
  const enableLoginButton = () => {
    return !username || !password; // Disable if username or password is empty
  };

  // Function to change login button style
  const changeLoginButtonStyle = () => {
    return enableLoginButton() ? 'disabled-button' : 'enabled-button';
  };

  // Function to handle login button click
  const clickLogin = (event) => {
    event.preventDefault(); // Prevent form submission/ clearing the whole page
    // Make API call to authenticate user with username/email/phone and password
    // Example: fetch('/api/login', { method: 'POST', body: { username, password }})
    // Handle authentication response accordingly
  };

  return (
    <div>
      <h1>Welcome to NutriBuddy</h1>
      <form className="login-form">
        {/* Input field for username/email/phone number */}
        <input 
          className="login-info" 
          onChange={handleIdInput} 
          type="text" 
          placeholder="Phone number, username or email" 
        />
        {/* Input field for password */}
        <input 
          className="login-info" 
          onChange={handlePwInput} 
          type="password" 
          placeholder="Password" 
        />
        {/* Button for login */}
        <button 
          className={changeLoginButtonStyle()} 
          disabled={enableLoginButton()} 
          type="submit" 
          onClick={clickLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
};