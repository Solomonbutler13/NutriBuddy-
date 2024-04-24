// Import React modules
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

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
        <div>
            <h1> Welcome to NutriBuddy</h1>
                            
                {/* Button for login */}
                <button
                    // className={changeLoginButtonStyle()}
                    enabled={enableLoginButton()}
                    type="submit"
                    onClick={handleLogin}
                >
                    Your tummy thanks you
                </button>
            
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

// Define the ForgotPasswordPage component
export function ForgotPasswordPage() {
    const handleResetPassword = () => {
        // Implement Auth0 reset password functionality here
    };

    return (
        <div>
            <h1>Forgot Password</h1>
            <p>Please enter your email address to reset your password.</p>
            <form onSubmit={handleResetPassword}>
                <input type="email" placeholder="Email" required />
                <button type="submit">Reset Password</button>
            </form>
            <p>
                <Link to="/LoginPage">Back to Login</Link>
            </p>
        </div>
    );  
}