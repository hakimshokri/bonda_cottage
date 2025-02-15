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
      <div class="px-6 py-6">
        <img src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png" alt="Logo" class="h-8" />
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
          <i className="fas fa-home w-5"></i>
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
          <i className="fas fa-calendar w-5"></i>
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
          <i className="fas fa-plus w-5"></i>
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
          <i className="fas fa-building w-5"></i>
          <span className="ml-3">Cottages List</span>
        </NavLink>
      </nav>
      <div class="absolute bottom-0 w-full p-6">
        <button onClick={logout} class="flex items-center w-full px-4 py-2 text-gray-700 hover:text-blue-500 rounded">
          <i class="fas fa-sign-out-alt w-5"></i>
          <span class="ml-3">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar