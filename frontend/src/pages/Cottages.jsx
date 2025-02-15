import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { format, addDays } from 'date-fns'
import { toast } from 'react-toastify'

const Cottages = () => {
  const navigate = useNavigate()
  const { cottages, searchData, setSearchData } = useContext(AppContext)

  const [filterCottage, setFilterCottage] = useState([])
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const applyFilter = () => {
    if (format(searchData.dateRange[0].endDate, 'dd-MM-yyyy') === format(searchData.dateRange[0].startDate, 'dd-MM-yyyy')) {
      return toast.error('Please select a valid date range')
    }

    setIsDatePickerOpen(false)

    if (!searchData.guests || searchData.guests < 1) {
      return toast.error('Please enter number of guests')
    }

    let dates = []
    let currentDate = new Date(searchData.dateRange[0].startDate)

    while (currentDate < new Date(searchData.dateRange[0].endDate)) {
      dates.push(format(currentDate, 'dd-MM-yyyy'))
      currentDate = addDays(currentDate, 1)
    }

    const availableCottages = cottages.filter((cottage) => {
      const cottageDates = cottage.slots_booked || []
      return !dates.some((date) => cottageDates.includes(date))
    })

    // setFilterCottage(availableCottages)
    setFilterCottage(cottages)

  }

  useEffect(() => {
    applyFilter()
  }, [])

  return (
    <div class="pt-16">
        <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div class="py-8">
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <h1 class="text-3xl font-bold text-gray-900">Find Your Perfect Cottage</h1>
                    <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        <div class="relative">
                            <select class="rounded-md bg-white border border-gray-300 text-gray-700 py-2 pl-4 pr-8 text-sm leading-5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black">
                                <option>Sort by: Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Guest Rating</option>
                            </select>
                        </div>
                       <span class="text-sm text-gray-500">Showing {cottages.length} cottages</span>
                    </div>
                </div>
                <div class="flex flex-col lg:flex-row gap-8">
                    <div class="w-full lg:w-64 flex-shrink-0 mb-6 lg:mb-0">
                        <div class="bg-white p-6 rounded-lg shadow-sm">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">Filters</h3>
                            
                            <div class="space-y-6">
                                <div>
                                    <h4 class="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
                                    <div class="flex items-center space-x-4">
                                        <input type="text" value="$100" class="!rounded-button w-20 border-gray-300 text-sm"/>
                                        <span class="text-gray-500">-</span>
                                        <input type="text" value="$500" class="!rounded-button w-20 border-gray-300 text-sm"/>
                                    </div>
                                </div>
                                <div>
                                    <h4 class="text-sm font-medium text-gray-900 mb-3">Bedrooms</h4>
                                    <div class="space-y-2">
                                        <label class="flex items-center">
                                            <input type="checkbox" class="rounded-md h-4 w-4 text-black border-gray-300"/>
                                            <span class="ml-2 text-sm text-gray-700">1 Bedroom</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" class="rounded-md h-4 w-4 text-black border-gray-300"/>
                                            <span class="ml-2 text-sm text-gray-700">2 Bedrooms</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" class="rounded-md h-4 w-4 text-black border-gray-300"/>
                                            <span class="ml-2 text-sm text-gray-700">3+ Bedrooms</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h4 class="text-sm font-medium text-gray-900 mb-3">Amenities</h4>
                                    <div class="space-y-2">
                                        <label class="flex items-center">
                                            <input type="checkbox" class="rounded-md h-4 w-4 text-black border-gray-300"/>
                                            <span class="ml-2 text-sm text-gray-700">Kitchen</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" class="rounded-md h-4 w-4 text-black border-gray-300"/>
                                            <span class="ml-2 text-sm text-gray-700">Fireplace</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" class="rounded-md h-4 w-4 text-black border-gray-300"/>
                                            <span class="ml-2 text-sm text-gray-700">Pool</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" class="rounded-md h-4 w-4 text-black border-gray-300"/>
                                            <span class="ml-2 text-sm text-gray-700">WiFi</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" class="rounded-md h-4 w-4 text-black border-gray-300"/>
                                            <span class="ml-2 text-sm text-gray-700">Hot Tub</span>
                                        </label>
                                    </div>
                                </div>
                                <button class="rounded-md w-full bg-black text-white py-2 text-sm font-medium">Apply Filters</button>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1">
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {filterCottage.map((item, index) => (
                                <div className="bg-white rounded-lg shadow-sm overflow-hidden" key={index}>
                                  <div className="relative pb-[66%]">
                                    <img
                                      src={item.main_image}
                                      className="absolute inset-0 w-full h-full object-cover"
                                      alt={item.name}
                                    />
                                    <button className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2">
                                      <i className="far fa-heart"></i>
                                    </button>
                                  </div>
                                  <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                      <div className="flex items-center">
                                        <img src={assets.star} alt="Star Icon" className="w-4 h-4 mr-1" />
                                        <span className="text-sm text-gray-600">4.5</span>
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                                    <div className="flex items-center space-x-4 mb-4">
                                      <div className="flex items-center">
                                      <img src={assets.bed} alt="Bed Icon" className="w-5 h-5 mr-2" />
                                        <span className="text-sm text-gray-600">3 beds</span>
                                      </div>
                                      <div className="flex items-center">
                                      <img src={assets.bath} alt="Bath Icon" className="w-5 h-5 mr-2" />
                                        <span className="text-sm text-gray-600">2 baths</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="text-black font-medium">RM{item.price}<span className="text-sm text-gray-500">/night</span></div>
                                      <button onClick={() => {
                                        navigate(`/booking/${item._id}`)
                                        scrollTo(0, 0)
                                      }} className="rounded-md bg-black text-white px-4 py-2 text-sm font-medium">View Details</button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cottages
