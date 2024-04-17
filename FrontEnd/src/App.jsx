import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';

import './index.css'


// Importing all the component pages here as we make them
import Login from './pages/login_page/login.jsx';
import SignUp from './pages/signup_page/signup.jsx';
import PersonalPage from './pages/personal_page/personal_info.jsx';
import Diet from './pages/diet_page/diet_info.jsx';
import Test from './pages/test.jsx';
import Allergies from './pages/allergies_page/allergies_info.jsx';
import Activity from './pages/activity_page/activity_info.jsx';
import MealPlanPanel from './pages/meal_plan_page/MealPlanPanel.jsx'


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

    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
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
    </>
  );
}
