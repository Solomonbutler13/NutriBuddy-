import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import './index.css'

// Importing all the component pages here as we make them
import Login from './pages/login_page/login.jsx';
import SignUp from './pages/signup_page/signup.jsx';
import PersonalPage from './pages/personal_page/personal_info.jsx';
import Test from './pages/test.jsx';

export default function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/personal_info' element={<PersonalPage />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </Router>
    </>
  )
}
