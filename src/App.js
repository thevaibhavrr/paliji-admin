import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom"; 
import Admin from './AdminPages/Admin';
import LoginForm from './auth/login';
import ForgotPasswordForm from './auth/sendMail';
import OtpVerifiedForm from './auth/otp';
import { useEffect } from 'react';

function App() {
  const history = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    // If token is not found, redirect to login page
    if (!token ) {
      history('/');
    }
  }, []);
  return (
    <div>
       <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/Forgot-Password" element={<ForgotPasswordForm />} />
        <Route path="/otp-verified" element={<OtpVerifiedForm />} />
       <Route
					path="/admin/*"
					element={<Admin />}
				/>
      </Routes>
    </div>
  );
}

export default App;

