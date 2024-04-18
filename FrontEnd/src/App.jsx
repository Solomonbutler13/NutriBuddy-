import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './assets/components/login';
import SignUp from './assets/components/signup';
import ProfilePage from './pages/ProfilePage'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/profile" element={<ProfilePage />} /> 
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
