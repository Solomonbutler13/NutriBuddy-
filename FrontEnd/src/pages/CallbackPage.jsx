import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = () => {
    const { user,isAuthenticated, isLoading, error } = useAuth0();
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
            navigate('/');
            return;
        }

        if (isAuthenticated) {
            let email = user.email;
            fetch('http://localhost:3000/allusers')
                .then(response => response.json())
                .then(data => {
                    let emailExists = false;
                    data.forEach(user => {
                        if (user.email === email) {
                            emailExists = true;
                        }
                    });
                    if (emailExists) {
                        navigate('/mealplan');
                    } else {
                        navigate('/personal_info');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [isLoading, isAuthenticated, error, navigate]); // Add dependencies to useEffect
}

export default AuthRedirect; // Return AuthRedirect component
