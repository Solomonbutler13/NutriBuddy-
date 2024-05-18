import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'

import './index.css';

// Importing about nutribuddy pages components 
import LoginPage from './pages/login_page/LoginPage'
import MealPlanPanel from './pages/meal_plan_page/MealPlanPanel'
import PersonalPage from './pages/personal_page/PersonalPage';
import AboutNutriBuddy from './pages/about_page/AboutNutriBuddy.jsx';
import Diet from './pages/diet_page/DietInfo';
import Test from './pages/Test';
import AllergiesInfo from './pages/allergies_page/AllergiesInfo';
import Activity from './pages/activity_page/ActivityInfo';
import CallbackPage from './pages/CallbackPage';

export default function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    logout,
  } = useAuth0();

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
        <Route path='/personal_info' element={<PersonalPage />} />
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
        <Route path='/about' element = {<AboutNutriBuddy />} />
        <Route path='/callback' element={<CallbackPage />} />
        <Route path='/diet_info' element={<Diet />} />
        <Route path='/allergies_info' element={<AllergiesInfo />} />
        <Route path='/activity_info' element={<Activity />} />
        <Route path='/test' element={<Test />} />
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


