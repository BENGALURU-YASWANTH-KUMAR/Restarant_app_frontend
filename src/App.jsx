import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Favourite from './components/Favourite';
import StartersPage from './components/StartersPage';
import MainCourses from './components/MainCourses';
import Desserts from './components/Desserts';
import ContactUs from './components/ContactUs';
import FavouriteProvider from './context/FavouriteProvider';
import Payment from './components/Payment';
import Footer from './components/Footer';

const App = () => {
  // State to track user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle successful login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <FavouriteProvider>
      <Router>
        {/* Pass isAuthenticated and handleLogout to Navbar */}
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Pass handleLogin to Login for updating authentication state */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/starters" element={<StartersPage />} />
          <Route path="/main-courses" element={<MainCourses />} />
          <Route path="/desserts" element={<Desserts />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        <Footer />
      </Router>
    </FavouriteProvider>
  );
};

export default App;