import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { format } from 'date-fns';

const AllBookings = () => {

  const { aToken, backendUrl, bookings, getAllBookings, cancelBooking } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllBookings()
    }
  }, [aToken])

  return (
    <div class="px-8 mt-8">
      <div class="mb-6 grid gap-4 md:grid-cols-4">
        <div class="relative">
          <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <i class="fas fa-calendar text-gray-400"></i>
          </span>
          <input type="date" class="block w-full rounded-lg border-gray-200 text-sm border pl-2 pr-3 py-2" placeholder="Start date" />
        </div>
        <div class="relative">
          <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <i class="fas fa-calendar text-gray-400"></i>
          </span>
          <input type="date" class="block w-full rounded-lg border-gray-200 text-sm border pl-2 pr-3 py-2" placeholder="End date" />
        </div>
        <select class="rounded-lg border-gray-200 text-sm border pl-2 pr-3 py-2">
          <option>All Status</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Canceled</option>
        </select>
        <button class="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 !rounded-button">
          Reset Filters
        </button>
      </div>
      <div class="rounded-lg border border-gray-200 bg-white">
        <div class="overflow-x-auto">
          <table class="w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                {/* <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Booking ID</th> */}
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Cottage</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Check-in &amp; Out</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Total Price</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              {bookings.map((item, index) => (
                <tr key={index}>
                  {/* <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">#{item._id}</td> */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* <img className="h-8 w-8 rounded-full" src={item.userImage} alt="User" /> */}
                      <div>
                        <p className="text-sm font-medium">{item.userData.name}</p>
                        <p className="text-xs text-gray-500">{item.userData.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img className="h-10 w-14 rounded-lg object-cover" src={item.cottageData.main_image} alt="Cottage" />
                      <div>
                        <p className="text-sm font-medium">{item.cottageData.name}</p>
                        {/* <p className="text-xs text-gray-500">{item.cottageRooms}</p> */}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <p className="text-sm">{format(item.checkInDate, 'dd MMM yyyy')}</p>
                    <p className="text-xs text-gray-500">{format(item.checkOutDate, 'dd MMM yyyy')}</p>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">RM{item.amount}</td>
                  <td className="whitespace-nowrap px-6 py-4 space-x-1">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${item.payment ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {item.payment ? 'Paid' : 'Unpaid'}
                    </span>
                    {item.cancelled && (
                      <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-800">
                        Cancelled
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex gap-2">
                      <button className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700">View</button>
                      {
                        !item.cancelled &&
                        <button onClick={() => cancelBooking(item._id)} className="rounded-lg bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600">Cancel</button>
                      }
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3">
          <div class="flex items-center gap-4">
            {/* <select class="rounded-lg border-gray-200 text-sm focus:border-blue-600 focus:ring-blue-600">
              <option>10 per page</option>
              <option>25 per page</option>
              <option>50 per page</option>
            </select> */}
            <span class="text-sm text-gray-700">
              Showing <span class="font-medium">{bookings.length}</span> results
            </span>
          </div>
          {/* <div class="flex gap-2">
            <button class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 !rounded-button">Previous</button>
            <button class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 !rounded-button">Next</button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default AllBookings