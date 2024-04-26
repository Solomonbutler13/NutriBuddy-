import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import './index.css'

// Importing grocery list component and cost calculator 


// Importing about nutribuddy pages components 
import AboutNutriBuddy from './Components/aboutNutriBuddy.jsx';

import MealPlanPanel from './pages/meal_plan_page/MealPlanPanel.jsx'

export default function App() {

  return (
    <>
      <Router>
        <Routes>
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

