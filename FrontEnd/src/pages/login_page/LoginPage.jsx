// Import React modules
import { useAuth0 } from '@auth0/auth0-react';
import './login.css'

export default function LoginPage() {
    // Define the Login component
    const { loginWithRedirect } = useAuth0();

    // Function to handle login button click
    const handleLogin = event => {
        event.preventDefault();
        loginWithRedirect();
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="page-info">
                    <h1> Welcome to NutriBuddy</h1>
                </div>

                {/* Button for login */}
                <button
                    id="login-button"
                    type="submit"
                    onClick={handleLogin}
                >
                    Your personal dietician awaits
                </button>
            </div>
        </div>
    );
}
