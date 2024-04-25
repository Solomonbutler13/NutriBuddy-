// Import React modules
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import './login.css'

export default function LoginPage() {
    // Define the Login component
    const { loginWithRedirect } = useAuth0();

    // Function to handle login button click
    const handleLogin = event => {
        event.preventDefault();
        loginWithRedirect();
    };

    const enableLoginButton = () => { };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="page-info">
                    <h1> Welcome to NutriBuddy</h1>
                </div>

                {/* Button for login */}
                <button
                    id="login-button"
                    enabled={enableLoginButton()}
                    type="submit"
                    onClick={handleLogin}
                >
                    Your personal dietician awaits
                </button>

                {/* Don't have an account? link */}
                <div className="to-login">
                    <Link to="/signup">Don't have an account? </Link>
                </div>
                {/* Forgot Password Link */}
                <div className="to-login">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </div>
        </div>
    );
}

// Define the ForgotPasswordPage component
export function ForgotPasswordPage() {
    const handleResetPassword = () => {
        // Implement Auth0 reset password functionality here
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="page-info">
                    <h1>Forgot Password</h1>
                </div>
                <p>Lets get you back on track</p>
                <form onSubmit={handleResetPassword}>
                    <input type="email" placeholder="Email" required />
                    <button id="login-button" type="submit">Reset Password</button>
                </form>
                <p className="to-login">
                    <Link to="/login">Back to Login</Link>
                </p>
            </div>
        </div>
    );
}