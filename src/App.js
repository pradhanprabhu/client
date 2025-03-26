import React, { useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SSRProvider } from '@react-aria/ssr';
import { ThemeProvider } from 'react-bootstrap';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homescreen from "./screens/Homescreen";
import AboutUs from './screens/AboutUs';
import ContactUs from './screens/ContactUs';
import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import RoomsScreen from './screens/RoomsScreen';
import Terms from './screens/Terms';
import PlacesScreen from './screens/PlacesScreen';

// Component to handle conditional footer rendering
const AppContent = () => {
  const location = useLocation();
  const isAuthPage = useMemo(() => 
    ['/login', '/register', '/forgot-password'].includes(location.pathname),
    [location.pathname]
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow-1">
        <Routes>
          {/* Default Route to Home */}
          <Route path="/" element={<Homescreen />} />
          <Route path="/home" element={<Homescreen />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/rooms" element={<RoomsScreen />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/places" element={<PlacesScreen />} />
          {/* Redirect unknown routes to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <SSRProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </SSRProvider>
  );
};

export default App;