// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './components/Home';
import About from './components/About';
import Starters from './components/StartersPage';
import MainCourses from './components/MainCourses';
import Desserts from './components/Desserts';
import Favourite from './components/Favourite';
import ContactUs from './components/ContactUs';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import VerifyOtp from './components/VerifyOtp';

import Payment from './components/Payment';
import { FavouriteProvider } from './context/FavouriteProvider';
import Loader from './components/Loader';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('sb_auth') === 'true'
  );
  const location = useLocation();

  const handleLoginSuccess = () => {
    localStorage.setItem('sb_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('sb_auth');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'sb_auth') {
        setIsAuthenticated(e.newValue === 'true');
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const authPaths = ['/login', '/register', '/forgot-password', '/reset-password'];
  const hideFooter = authPaths.includes(location.pathname);

  const RequireAuth = ({ children }) =>
    isAuthenticated ? children : <Navigate to="/login" replace />;

  return (
    <FavouriteProvider>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

      <Routes>
        <Route path="/loader" element={<Loader />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/starters" element={<Starters />} />
        <Route path="/main-courses" element={<MainCourses />} />
        <Route path="/desserts" element={<Desserts />} />

        <Route path="/favourite" element={<Favourite />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Auth */}
        <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        {/* Protected */}
        <Route
          path="/payment"
          element={
            <RequireAuth>
              <Payment />
            </RequireAuth>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideFooter && <Footer />}
    </FavouriteProvider>
  );
};

export default App;
