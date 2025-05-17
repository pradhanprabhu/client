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
import PaymentScreen from './screens/PaymentScreen';
import AdminDashboard from './screens/AdminDashboard';
import AdminRooms from './screens/AdminRooms';
import AdminPlaces from './screens/AdminPlaces';
import AdminUsers from './screens/AdminUsers';
import AdminBookings from './screens/AdminBookings';
import PlacesScreen from './screens/PlacesScreen';
import ProtectedRoute from './components/ProtectedRoute';
import VerificationScreen from "./screens/VerificationsScreen";
import VerifyReset from './screens/VerifyReset';
import BookingScreen from "./screens/BookingScreen";
import UserBookingsScreen from './screens/UserBookingsScreen';
import ResetPassword from './screens/ResetPassword';
import PaymentSuccess from './screens/PaymentSuccess';
import PaymentFailure from './screens/PaymentFailure';
import AdminPayments from './screens/AdminPayments';
import PaymentVerificationScreen from './screens/PaymentVerificationScreen';

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
          {isAdminRoute ? (
            <div className="admin-container">
              <AdminSidebar />
              <main className="admin-main-content">
                <Routes>
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/rooms" element={
                    <ProtectedRoute>
                      <AdminRooms />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/places" element={
                    <ProtectedRoute>
                      <AdminPlaces />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/bookings" element={
                    <ProtectedRoute>
                      <AdminBookings />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/users" element={
                    <ProtectedRoute>
                      <AdminUsers />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/payments" element={
                    <ProtectedRoute>
                      <AdminPayments />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<Navigate to="/login" replace />} />
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
                  <Route path="/book/:roomId" element={<BookingScreen />} />
                  <Route path="/profile/:userId" element={<ProfileScreen />} />
                  <Route path="/payment" element={<PaymentScreen />} />
                  <Route path="/verify" element={<VerificationScreen />} />
                  <Route path="/verify-reset" element={<VerifyReset />} />
                  <Route path="/places" element={<PlacesScreen />} />
                  <Route path="/bookings" element={<UserBookingsScreen />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/payment-failure" element={<PaymentFailure />} />
                  <Route path="/payment/verify" element={<PaymentVerificationScreen />} />
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
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </main>
      )}
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <SSRProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </SSRProvider>
  );
}

export default App;