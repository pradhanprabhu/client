import React, { useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SSRProvider } from '@react-aria/ssr';
import { ThemeProvider } from 'react-bootstrap';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminSidebar from "./components/AdminSidebar";
import Homescreen from "./screens/Homescreen";
import AboutUs from './screens/AboutUs';
import ContactUs from './screens/ContactUs';
import ForgotPassword from './screens/ForgotPassword';
import RoomsScreen from './screens/RoomsScreen';
import Terms from './screens/Terms';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import BookingScreen from './screens/BookingScreen';
import PaymentScreen from './screens/PaymentScreen';
import AdminDashboard from './screens/AdminDashboard';
import AdminRooms from './screens/AdminRooms';
import AdminPlaces from './screens/AdminPlaces';
import AdminUsers from './screens/AdminUsers';
import AdminBookings from './screens/AdminBookings';
import PlacesScreen from './screens/PlacesScreen';
import ProtectedRoute from './components/ProtectedRoute';
import VerificationScreen from "./screens/VerficationsScreen";
import VerifyReset from './screens/VerifyReset';

import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppContent() {
  const location = useLocation();
  const isAuthPage = useMemo(() => {
    return location.pathname === '/login' || 
           location.pathname === '/register' || 
           location.pathname === '/forgot-password';
  }, [location.pathname]);

  const isAdminRoute = useMemo(() => {
    return location.pathname.startsWith('/admin');
  }, [location.pathname]);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div className="d-flex flex-column min-vh-100">
      {!isAuthPage && (
        <>
          {isAdminRoute && userInfo?.isAdmin ? (
            <div className="admin-container">
              <AdminSidebar />
              <main className="admin-main-content">
                <Routes>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/rooms" element={<AdminRooms />} />
                  <Route path="/admin/places" element={<AdminPlaces />} />
                  <Route path="/admin/bookings" element={<AdminBookings />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                </Routes>
              </main>
            </div>
          ) : (
            <>
              <Navbar />
              <main className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<Homescreen />} />
                  <Route path="/home" element={<Homescreen />} />
                  <Route path="/aboutus" element={<AboutUs />} />
                  <Route path="/contactus" element={<ContactUs />} />
                  <Route path="/rooms" element={<RoomsScreen />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/profile/:userId" element={<ProfileScreen />} />
                  <Route path="/book/:roomId" element={<BookingScreen />} />
                  <Route path="/payment" element={<PaymentScreen />} />
                  <Route path="/verify" element={<VerificationScreen />} />
                  <Route path="/places" element={<PlacesScreen />} />
                </Routes>
              </main>
              <Footer />
            </>
          )}
        </>
      )}
      {isAuthPage && (
        <main className="flex-grow-1">
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-reset" element={<VerifyReset />} />
          </Routes>
        </main>
      )}
    </div>
  );
}

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