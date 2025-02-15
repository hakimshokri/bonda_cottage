import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useEffect } from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {

  const { aToken, getDashboardData, dashboardData, cancelBooking } = useContext(AdminContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (aToken) {
      getDashboardData()
    }
  }, [aToken])

  return dashboardData && (

    <div class="p-8">
      <div class="grid grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-blue-100">
              <i class="fas fa-home text-blue-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500">Total Cottages</h3>
              <p class="text-2xl font-semibold text-gray-900">{dashboardData.cottages}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-blue-100">
              <i class="fas fa-calendar-check text-blue-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500">Total Bookings</h3>
              <p class="text-2xl font-semibold text-gray-900">{dashboardData.bookings}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-blue-100">
              <i class="fas fa-users text-blue-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500">Total Users</h3>
              <p class="text-2xl font-semibold text-gray-900">{dashboardData.users}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-blue-100">
              <i class="fas fa-chart-bar text-blue-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500">Revenue</h3>
              <p class="text-2xl font-semibold text-gray-900">$24,500</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-900">Latest Bookings</h2>
            <a onClick={() => {navigate('/all-bookings'); scrollTo(0, 0)}} class="text-blue-600 hover:text-blue-700 font-medium">View all</a>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cottage</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              {dashboardData.latestBookings.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {/* <img
                        src={item.userData.image}
                        alt={item.userName}
                        className="w-8 h-8 rounded-full"
                      /> */}
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{item.userData.name}</p>
                        <p className="text-sm text-gray-500">{item.userData.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.cottageData.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{format(item.checkInDate, 'dd MMM yyyy')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{format(item.checkOutDate, 'dd MMM yyyy')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full  ${item.payment ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {item.payment ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

export default Dashboard