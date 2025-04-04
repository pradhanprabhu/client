import React, { useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SSRProvider } from '@react-aria/ssr';
import { ThemeProvider } from 'react-bootstrap';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homescreen from "./screens/Homescreen";
import AboutUs from './screens/AboutUs';
import ContactUs from './screens/ContactUs';
import ForgotPassword from './screens/ForgotPassword';
import RoomsScreen from './screens/RoomsScreen';
import Terms from './screens/Terms';
import PlacesScreen from './screens/PlacesScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import BookingScreen from './screens/BookingScreen';
import BookingConfirmationScreen from './screens/BookingConfirmationScreen';
import PaymentScreen from './screens/PaymentScreen';
import AdminDashboard from "./screens/AdminDashboard";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/rooms" element={<RoomsScreen />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/places" element={<PlacesScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/book/:roomId" element={<BookingScreen />} />
          <Route path="/booking-confirmation" element={<BookingConfirmationScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/admin" element={<AdminDashboard />} />
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
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </SSRProvider>
  );
};

export default App;