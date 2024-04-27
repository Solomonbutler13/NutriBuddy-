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

// Importing all the component pages here as we make them
import Login from './pages/login_page/login.jsx';
import SignUp from './pages/signup_page/signup.jsx';
import PersonalPage from './pages/personal_page/personal_info.jsx';
import Diet from './pages/diet_page/diet_info.jsx';
import Test from './pages/test.jsx';
import Allergies from './pages/allergies_page/allergies_info.jsx';
import Activity from './pages/activity_page/activity_info.jsx';
import MealPlanPanel from './pages/meal_plan_page/MealPlanPanel.jsx'
import CallbackPage from './pages/callbackPage'

export default function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    logout,
  } = useAuth0();
  
  const handleSignout = async () => await logout()

  // Loading State
  if (isLoading) {
    return <div>Loading...</div>
  }

  // Content to render based on authentication state
  const renderContent = () => {
    if (isAuthenticated) {

      const handleSignout = event => { }

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

  if (error) {
    return <div>Oops...wrong fridge {error.message}</div>
  }

  return (
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
        <Route path='/signup' element={<SignUp />} />
        <Route path='/personal_info' element={<PersonalPage />} />
        <Route path='/diet_info' element={<Diet />} />
        <Route path='/allergies_info' element={<Allergies />} />
        <Route path='/activity_info' element={<Activity />} />
        <Route path='/test' element={<Test />} />
        <Route path='/mealplan' element={<MealPlanPanel meals={[{
          id: '1',
          title: 'meal title',
          imageUrl: 'https://placeholder.pics/svg/300',
          description: 'this is turkey sandwich',
          calories: '560'
        },
        {
          id: '2',
          title: 'meal title',
          imageUrl: 'https://placeholder.pics/svg/500',
          description: 'this is turkey sandwich',
          calories: '560'
        },
        {
          id: '3',
          title: 'meal title',
          imageUrl: 'https://placeholder.pics/svg/500',
          description: 'this is turkey sandwich',
          calories: '560'
        },
        {
          id: '4',
          title: 'meal title',
          imageUrl: 'https://placeholder.pics/svg/500',
          description: 'this is turkey sandwich',
          calories: '560'
        },
        ]} />} />

      </Routes>
    </Router>
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