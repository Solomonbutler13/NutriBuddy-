import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import './index.css'

// Importing grocery list component and cost calculator 

import GroceryList from './Components/groceryList.jsx';

// Importing Recipe of the day component 

import RecipeOfTheDay from './Components/recipeOfTheDay.jsx';

// Importing about nutribuddy pages components 
import AboutNutriBuddy from './Components/aboutNutriBuddy.jsx';

export default function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/grocerylist' element = {<GroceryList />} /> 

        <Route path='/recipe' element = {<RecipeOfTheDay />} />

        <Route path='/about' element = {<AboutNutriBuddy />} />
      </Routes>
    </Router>
    </>
  )
}

