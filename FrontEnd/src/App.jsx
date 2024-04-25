import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';

import './index.css'

// Importing all the component pages here as we make them
import PersonalPage from './assets/components/personal_page/personal_info.jsx';
import SignUp from './pages/signup.jsx'
import LoginPage from './pages/login_page/LoginPage'
import CallbackPage from './pages/callbackPage'

export default function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    logout,
  } = useAuth0();

  // Loading State
  if (isLoading) {
    return <div>Loading...</div>
  }

  // Content to render based on authentication state
  const renderContent = () => {
    if (isAuthenticated) {
      // User is authenticated
      return (
        <Router>
          <Routes>
            <Route path="/" element={<p>Personal Page</p>} />
            <Route path="/personal_info" element={<p>Personal Page</p>} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} /> 
            {/* New route for Forgot Password */}
            <Route path="/callback" element={<CallbackPage />} />
          </Routes>
        </Router>
      );
    } else {
      // User is not authenticated
      return (
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<p>SignUp Page</p>} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} /> 
            {/* New route for Forgot Password */}
            <Route path="/callback" element={<CallbackPage />} />
          </Routes>
        </Router>
      );
    }
  };

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/personal_info' element={<PersonalPage />} />
      </Routes>
    </Router>
    </>
  );
}
