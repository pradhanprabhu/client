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
import AdminNavbar from './components/AdminNavbar';
import PlacesScreen from './screens/PlacesScreen';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = useMemo(() => 
    ['/login', '/register', '/forgot-password'].includes(location.pathname),
    [location.pathname]
  );
  const isAdminRoute = useMemo(() => 
    location.pathname.startsWith('/admin') || location.pathname === '/dashboard',
    [location.pathname]
  );

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div className="d-flex flex-column min-vh-100">
      {!isAuthPage && (isAdminRoute ? <AdminNavbar /> : <Navbar />)}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/home" element={<Homescreen />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/rooms" element={<RoomsScreen />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/profile/:userId" element={<ProfileScreen />} />
          <Route path="/book/:roomId" element={<BookingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/rooms" element={<AdminRooms />} />
          <Route path="/admin/places" element={<AdminPlaces />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/places" element={<PlacesScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {!isAuthPage && !(userInfo && userInfo.isAdmin) && <Footer />}
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