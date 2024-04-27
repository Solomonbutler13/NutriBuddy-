import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import './index.css'

// Importing all the component pages here as we make them
import PersonalPage from './assets/components/personal_page/personal_info.jsx';
import SignUp from './pages/signup.jsx'
import LoginPage from './pages/login_page/LoginPage'
import CallbackPage from './pages/callbackPage'

export default function App () {
  const {
    isLoading,
    isAuthenticated,
    logout
  } = useAuth0()


  const handleSignout = async () => await logout()


  // Loading State
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
<<<<<<< HEAD
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/personal_info' element={<PersonalPage />} />
      </Routes>
    </Router>
    </>
=======
    <Router>
      {isAuthenticated && (
        <button id='signout-button' type='submit' onClick={() => logout()}>
          See You Later
        </button>
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/personal_info' element={<p>Personal Info</p>} />
        <Route path='/signup' element={<p>SignUp Page</p>} />
        <Route path='/callback' element={<CallbackPage />} />
      </Routes>
    </Router>
>>>>>>> 16852ff (Fix callback URL bug in login page and refactor to use Auth0 login)
  );
}

function Home() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/personal_info');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? null : <LoginPage />;
}