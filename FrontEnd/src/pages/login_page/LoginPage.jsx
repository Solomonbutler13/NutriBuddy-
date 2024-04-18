// Import React modules
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    // Define the Login component
    const { loginWithRedirect } = useAuth0();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle login button click
    const handleLogin = event => {
        event.preventDefault(); 
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

    // return = function runs and below is what we want to happen
    return (
        <div>
            <h1> Welcome to NutriBuddy</h1>
            <form className="login-form-form">
                {/* Input field for username/email*/}
                <input
                    className="login-form-input"
                    onChange={handleIdInput}
                    type="text"
                    placeholder="username or email"
                />
                {/* Input field for password */}
                <input
                    className="login-form-input"
                    onChange={handlePwInput}
                    type="password"
                    placeholder="Password"
                />
                {/* Button for login */}
                <button
                    className={changeLoginButtonStyle()}
                    disabled={enableLoginButton()}
                    type="submit"
                    onClick={handleLogin}
                >
                    Your tummy thanks you
                </button>
            </form>
            {/* Don't have an account? link */}
            <p>
                <Link to="/signup">Don't have an account? </Link>
            </p>
            {/* Forgot Password Link */}
            <p>
                <Link to="/forgot-password">Forgot Password?</Link>
            </p>
        </div>
    );
}
