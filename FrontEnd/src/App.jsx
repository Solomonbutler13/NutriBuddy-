import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import './index.css'

// Importing all the component pages here as we make them
import Login from './assets/components/login.jsx'
import SignUp from './assets/components/signup.jsx'
import MealPlanPanel from './assets/components/MealPlanPanel.jsx'

export default function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/test' element={<MealPlanPanel meals={[{
            id: '1',
            title: 'meal title',
            imageUrl: 'https://placeholder.pics/svg/500',
            description: 'this is turkey sandwich',
            calories: '560 kcal'
          }]} />} />
        </Routes>
      </Router>
    </>
  )
}
