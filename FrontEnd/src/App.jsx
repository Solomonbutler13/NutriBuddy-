import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import ProfilePage from './pages/ProfilePage'; 
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import './index.css'


// Importing about nutribuddy pages components 
import AboutNutriBuddy from './pages/about_nutribuddy/aboutNutriBuddy'
import MealPlanPanel from './pages/meal_plan_page/MealPlanPanel'
import Login from './pages/login_page/login';
import SignUp from './pages/signup_page/signup';
import PersonalPage from './pages/personal_page/personal_info';
import Diet from './pages/diet_page/diet_info';
import Test from './pages/test';
import Allergies from './pages/allergies_page/allergies_info';
import Activity from './pages/activity_page/activity_info';
import * as CallbackPage from './pages/callbackPage';

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
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
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
        <Route path='/allergies_info' element={<Allergies />} />
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


