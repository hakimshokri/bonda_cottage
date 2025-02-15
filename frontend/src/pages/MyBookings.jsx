import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {

  const navigate = useNavigate()
  const { backendUrl, token, getCottagesData } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');

  const getUserBookings = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/bookings', { headers: { token } });

      if (data.success) {
        const sortedBookings = data.bookings.reverse();
        const past = [];
        const upcoming = [];

        sortedBookings.forEach((item) => {
          const checkOutDate = new Date(item.checkOutDate);
          const now = new Date();

          if (checkOutDate < now) {
            past.push(item);
          } else {
            upcoming.push(item);
          }
        });

        setBookings(sortedBookings);
        setPastBookings(past);
        setUpcomingBookings(upcoming);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-booking', { bookingId }, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        getUserBookings();
        getCottagesData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  // Function to make payment using stripe
  const bookingStripe = async (bookingId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { bookingId }, { headers: { token } })
      if (data.success) {
        const { session_url } = data
        window.location.replace(session_url)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserBookings();
    }
  }, [token]);

  return (
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-[70px]">
      <div class="mb-2">
        <h1 class="text-2xl font-semibold text-gray-900">Booking History</h1>
      </div>
      <div class="mb-6">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('upcoming')}
              class={`${activeTab === 'upcoming' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} cursor-pointer py-4 px-1 border-b-2 font-medium text-sm`}
              id="upcoming-tab">Upcoming Bookings
            </button>
            <button onClick={() => setActiveTab('past')}
              class={`${activeTab === 'past' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} cursor-pointer py-4 px-1 border-b-2 font-medium text-sm`}
              id="past-tab">Past Bookings
            </button>
          </nav>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow mb-8">
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Date Range</label>
              <div class="flex space-x-4">
                <div class="relative flex-1">
                  <input type="date" class="block w-full rounded-md border-gray-300 shadow-sm border pl-2 pr-3 py-2" />
                </div>
                <div class="relative flex-1">
                  <input type="date" class="block w-full rounded-md border-gray-300 shadow-sm border pl-2 pr-3 py-2" />
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <select class="block w-2/3 rounded-md border-gray-300 shadow-sm border pl-2 pr-3 py-2">
                <option>All Bookings</option>
                <option>Confirmed</option>
                <option>Completed</option>
                <option>Canceled</option>
              </select>
            </div>
            <div class="flex items-end">
              <button class="rounded-md bg-white border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {activeTab === 'upcoming' ?
          upcomingBookings.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
              <img
                className="h-48 w-full object-cover"
                src={item.cottageData.main_image}
                alt={item.cottageData.name}
              />
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.cottageData.name}</h3>
                    <p className="text-sm text-gray-500">Booking #{item._id}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.payment ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {item.payment ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <img src={assets.check_in} alt="Calendar Icon" className="w-4 h-4 mr-2" />
                    Check-in: {format(new Date(item.checkInDate), 'dd MMM yyyy')}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <img src={assets.check_out} alt="Calendar Icon" className="w-4 h-4 mr-2" />
                    Check-out: {format(new Date(item.checkOutDate), 'dd MMM yyyy')}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <img src={assets.dollar} alt="Dollar Icon" className="w-4 h-4 mr-2" />
                    Total: RM{item.amount}
                  </div>
                </div>
                <div className="mt-6 flex space-x-4">
                  <button onClick={() => { navigate(`/booking/${item.cottageData._id}`); scrollTo(0, 0) }} className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    View Details
                  </button>
                  <button onClick={() => { navigate(`/booking/${item.cottageData._id}`); scrollTo(0, 0) }} className="flex-1 rounded-md bg-white border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Book Again
                  </button>
                </div>
              </div>
            </div>

          ))
          :
          pastBookings.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
              <img
                className="h-48 w-full object-cover"
                src={item.cottageData.main_image}
                alt={item.cottageData.name}
              />
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.cottageData.name}</h3>
                    <p className="text-sm text-gray-500">Booking #{item._id}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.payment ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {item.payment ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <img src={assets.check_in} alt="Calendar Icon" className="w-4 h-4 mr-2" />
                    Check-in: {format(new Date(item.checkInDate), 'dd MMM yyyy')}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <img src={assets.check_out} alt="Calendar Icon" className="w-4 h-4 mr-2" />
                    Check-out: {format(new Date(item.checkOutDate), 'dd MMM yyyy')}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <img src={assets.dollar} alt="Dollar Icon" className="w-4 h-4 mr-2" />
                    Total: RM{item.amount}
                  </div>
                </div>
                <div className="mt-6 flex space-x-4">
                  <button onClick={() => { navigate(`/booking/${item.cottageData._id}`); scrollTo(0, 0) }} className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    View Details
                  </button>
                  <button onClick={() => { navigate(`/booking/${item.cottageData._id}`); scrollTo(0, 0) }} className="flex-1 rounded-md bg-white border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Book Again
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default MyBookings;
