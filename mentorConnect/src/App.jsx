import Dashboard from './pages/Dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPassword from './pages/Forgetpassword';
import { loggedInContext } from './context/context';
import { useState } from 'react';
import MentorInfo from './components/MentorInfo';

function App() {
  const [loggedIn, setloggedIn] = useState(false);
  return (
    <>
    <loggedInContext.Provider value={{loggedIn, setloggedIn}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/forget" element={<ForgotPassword />}/>
            <Route path="/mentorById/:email" element={<MentorInfo />}/>
          </Routes>
        </BrowserRouter>
      </loggedInContext.Provider>
    </>
  )
}

export default App
