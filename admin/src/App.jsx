import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AllBookings from './pages/AllBookings';
import AddCottage from './pages/AddCottage';
import CottagesList from './pages/CottagesList';
const App = () => {

  const { aToken } = useContext(AdminContext)
  return aToken ? (
  <div className="flex h-screen">
      <ToastContainer />
      <Sidebar />
      <div className="flex flex-col ml-64 flex-1">
        <Navbar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path='/' element={<></>} />
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/all-bookings' element={<AllBookings />} />
            <Route path='/add-cottage' element={<AddCottage />} />
            <Route path='/cottage-list' element={<CottagesList />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App