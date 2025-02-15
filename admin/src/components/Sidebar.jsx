import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

  const navigate = useNavigate()
  const { aToken, setAToken, title, setTitle } = useContext(AdminContext)


  const logout = () => {
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div class="w-64 bg-white border-r border-gray-200 fixed h-full">
      <div class="px-6 py-4">
        <img src={assets.cottage_logo} alt="Logo" class="h-12" />
      </div>
      <nav class="mt-6">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            isActive
              ? "flex items-center px-6 py-3 bg-gray-50 text-blue-500"
              : "flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-500"
          }
          onClick={() => setTitle('Dashboard')}
        >
          <img src={assets.dashboard} alt="Home Icon" className="w-5 h-5" />
          <span className="ml-3">Dashboard</span>
        </NavLink>
        <NavLink
          to="/all-bookings"
          className={({ isActive }) =>
            isActive
              ? "flex items-center px-6 py-3 bg-gray-50 text-blue-500"
              : "flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-500"
          }
          onClick={() => setTitle('Bookings Management')}
        >
          <img src={assets.booking} alt="Booking Icon" className="w-5 h-5" />
          <span className="ml-3">Bookings</span>
        </NavLink>
        <NavLink
          to="/add-cottage"
          className={({ isActive }) =>
            isActive
              ? "flex items-center px-6 py-3 bg-gray-50 text-blue-500"
              : "flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-500"
          }
          onClick={() => setTitle('Add Cottage')}
        >
          <img src={assets.add_cottage} alt="Add Cottage Icon" className="w-5 h-5" />
          <span className="ml-3">Add Cottage</span>
        </NavLink>
        <NavLink
          to="/cottage-list"
          className={({ isActive }) =>
            isActive
              ? "flex items-center px-6 py-3 bg-gray-50 text-blue-500"
              : "flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-500"
          }
          onClick={() => setTitle('Cottages List')}
        >
          <img src={assets.cottage} alt="Cottage Icon" className="w-5 h-5" />
          <span className="ml-3">Cottages List</span>
        </NavLink>
      </nav>
      <div class="absolute bottom-0 w-full p-6">
        <button onClick={logout} class="flex items-center w-full px-4 py-2 text-gray-700 hover:text-blue-500 rounded">
        <img src={assets.logout} alt="Logout Icon" className="w-5 h-5" />
          <span class="ml-3">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar