import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import './index.css'

// Importing grocery list component and cost calculator 


// Importing about nutribuddy pages components 
import AboutNutriBuddy from './Components/aboutNutriBuddy.jsx';

import MealPlanPanel from './pages/meal_plan_page/MealPlanPanel.jsx'
// Importing all the component pages here as we make them
import Login from './assets/components/login.jsx'
import SignUp from './assets/components/signup_page/signup.jsx'
import PersonalPage from './assets/components/personal_page/personal_info.jsx';

export default function App() {

  return (
    <>
    <Router>
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
      </Routes>
    </Router>
    </>
  )
}

