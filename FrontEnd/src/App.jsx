import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import './index.css'

// Importing all the component pages here as we make them
import Login from './pages/login.jsx'
import SignUp from './pages/signup.jsx'

export default function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Router>
    </>
  )
}
