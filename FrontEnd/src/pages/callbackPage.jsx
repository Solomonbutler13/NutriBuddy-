import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = () => {
    const { isAuthenticated, isLoading, error } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            // Handle the loading state
            console.log('Checking authentication...');
            return;
        }

        if (error) {
            // Handle the error state
            console.error('Error during authentication:', error);
            navigate('/signin');
            return;
        }

        if (isAuthenticated) {
            // Redirect to personal page if authenticated
            navigate('/personalPage');
        } else {
            // Redirect to sign-in page if not authenticated
            navigate('/signin');
        }
    }, [isLoading, isAuthenticated, error, navigate]); // Add dependencies to useEffect
}

export default AuthRedirect; // Return AuthRedirect component
