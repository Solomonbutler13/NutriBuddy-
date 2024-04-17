import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';

import './index.css'

// Importing all the component pages here as we make them
import Login from './components/login_page/login.jsx'
// import SignUp from './assets/components/signup_page/signup.jsx';
// import PersonalPage from './assets/components/personal_page/personal_info.jsx';

export default function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  // Loading State
  if (isLoading) {
    return <div>Loading...</div>
  }

  // Error State
  if (error) {
    return <div>Oops...wrong fridge {error.message}</div>
  }

  // Content to render based on authentication state
  const renderContent = () => {
    if (isAuthenticated) {
      // User is authenticated
      return (
        <Router>
          <Routes>
            <Route path="/" element={<PersonalPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/personal_info" element={<PersonalPage />} />
          </Routes>
        </Router>
      );
    } else {
      // User is not authenticated
      return (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/personal_info" element={<Login redirectUrl="/personal_info" />} />
          </Routes>
        </Router>
      );
    }
  };

  return (
    <>
      {renderContent()}
    </>
  );
}
