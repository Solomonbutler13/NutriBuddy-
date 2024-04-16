import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import './index.css'

// Importing all the component pages here as we make them
import PersonalPage from './assets/components/personal_page/personal_info.jsx';
import Login from './pages/login.jsx'
import SignUp from './pages/signup.jsx'

export default function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/personal_info' element={<PersonalPage />} />
      </Routes>
    </Router>
    </>
  )
}
