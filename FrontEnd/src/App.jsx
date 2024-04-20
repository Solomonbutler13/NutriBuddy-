import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import './index.css'

// Importing all the component pages here as we make them
import Login from './assets/components/login.jsx'
import SignUp from './assets/components/signup.jsx'

// Importing grocery list component and cost calculator 

import GroceryList from './assets/components/groceryList.jsx';

// Importing Recipe of the day component 

import RecipeOfTheDay from './assets/components/recipeOfTheDay.jsx';

export default function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/grocerylist' element = {<GroceryList />} /> 

        <Route path='/recipe' element = {<RecipeOfTheDay />} />
      </Routes>
    </Router>
    </>
  )
}

