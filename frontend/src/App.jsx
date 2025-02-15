import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cottages from './pages/Cottages'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyBookings from './pages/MyBookings'
import Booking from './pages/Booking'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify'
import BookingDetails from './pages/BookingDetails'
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import VerifyResetPassword from './pages/VerifyResetPassword'
import SetNewPassword from './pages/SetNewPassword'

const App = () => {
  return (
    <div className='bg-gray-50'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cottages' element={<Cottages />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/verify-reset-password' element={<VerifyResetPassword />} />
        <Route path='/set-new-password' element={<SetNewPassword />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/booking/:cottageId' element={<Booking />} /> 
        <Route path='/booking-details/:cottageId' element={<BookingDetails />} /> 
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App