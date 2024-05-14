import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import './index.css'

// Importing all the pages here as we make them
import LoginPage from './pages/login_page/LoginPage';
import PersonalPage from './pages/personal_page/personal_info.jsx';
import Diet from './pages/diet_page/diet_info.jsx';
import Test from './components/test.jsx';
import Allergies from './pages/allergies_page/allergies_info.jsx';
import Activity from './pages/activity_page/activity_info.jsx';
import MealPlanPanel from './pages/meal_plan_page/MealPlanPanel.jsx';
import CallbackPage from './pages/callbackPage';

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
        <Route path='/callback' element={<CallbackPage />} />
        {isAuthenticated && ( <Route path='/personal_info' element={<PersonalPage />} />)}
        {isAuthenticated && ( <Route path='/diet_info' element={<Diet />} />)}
        {isAuthenticated && ( <Route path='/allergies_info' element={<Allergies />} />)}
        {isAuthenticated && ( <Route path='/activity_info' element={<Activity />} />)}
        {isAuthenticated && ( <Route path='/test' element={<Test />} />)}
        {isAuthenticated && ( <Route path='/mealplan' element={<MealPlanPanel meals={[{
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
        ]} />} />)}

      </Routes>
    </Router>
  );
}

function Home() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/personal_info'); // needs to route user profile page
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? null : <LoginPage />;
}