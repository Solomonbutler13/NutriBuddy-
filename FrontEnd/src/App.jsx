import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';

import './index.css'

// Import Pages 
import LoginPage from './pages/login_page/LoginPage'
import CallbackPage from './pages/callbackPage'

export default function App() {
  const {
    isLoading,
    isAuthenticated,
    // error,
    // user,
    logout
  } = useAuth0();

  // Loading State
  if (isLoading) {
    return <div>Loading...</div>
  }

  // Content to render based on authentication state
  const renderContent = () => {
    if (isAuthenticated) {

      const handleSignout = async () => await logout()

      // User is authenticated
      return (
        <>
          <button
            id="signout-button"
            type="submit"
            onClick={handleSignout}
          >Sign Out</button>
          
          <Router>
            <Routes>
              <Route path="/personal_info" element={<p>Personal Info</p>} />
              <Route path="/callback" element={<CallbackPage />} />
            </Routes>
          </Router>
        </>
      );
    } else {
      // User is not authenticated
      return (
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<p>SignUp Page</p>} />
            <Route path="/callback" element={<CallbackPage />} />
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
