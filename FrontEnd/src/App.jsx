import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

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
import CallbackPage from './pages/callbackPage'

export default function App () {
  const {
    isLoading,
    isAuthenticated,
    // error,
    // user,
    logout
  } = useAuth0()


  const handleSignout = async () => await logout()


  // Loading State
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
<<<<<<< HEAD
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
=======
    <Router>
      {isAuthenticated && (
        <button id='signout-button' type='submit' onClick={() => logout()}>
          Sign Out
        </button>
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/personal_info' element={<p>Personal Info</p>} />
        <Route path='/signup' element={<p>SignUp Page</p>} />
        <Route path='/callback' element={<CallbackPage />} />
      </Routes>
    </Router>
>>>>>>> 16852ff (Fix callback URL bug in login page and refactor to use Auth0 login)
  );
}

function Home() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/personal_info');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? null : <LoginPage />;
}