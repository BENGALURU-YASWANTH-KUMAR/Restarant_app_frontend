import React, { useState } from 'react';
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
import Login from './components/Login';
import Register from './components/Register';
import Payment from './components/Payment';
import { FavouriteProvider } from './context/FavouriteProvider';   // ✅ fixed import

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

  // Hide footer on login/register pages
  const hideFooter = ['/login', '/register'].includes(location.pathname.replace('#', ''));

  return (
    <FavouriteProvider>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/starters" element={<Starters />} />
        <Route path="/main-courses" element={<MainCourses />} />
        <Route path="/desserts" element={<Desserts />} />

        <Route path="/favourite" element={<Favourite />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />

        <Route path="/payment" element={<Payment />} />

        {/* Catch-all → redirect home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideFooter && <Footer />}
    </FavouriteProvider>
  );
};

export default App;
