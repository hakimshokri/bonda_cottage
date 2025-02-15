import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'

const CottagesList = () => {

  const { aToken, cottages, getAllCottages, changeStatus } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllCottages()
    }
  }, [aToken])

  return (
    <div class="p-8">
      <div class="mb-6 flex flex-wrap gap-4">
        <div class="flex-1 min-w-[240px]">
          <div class="relative">
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input type="text" placeholder="Search cottages..." class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
        <select class="border border-gray-200 rounded py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option>All Status</option>
          <option>Available</option>
          <option>Booked</option>
        </select>
        <select class="border border-gray-200 rounded py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option>Sort by: Latest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cottages.map((item, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden group">
            <div className="aspect-w-16 aspect-h-9">
              <img src={item.main_image} alt={item.name} className="object-cover w-full h-40" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${item.status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {item.status}
                </span>
              </div>
              <div className="text-gray-600 text-sm mb-4">
                <div className="flex items-center mb-1">
                {/* <img src="" alt="Dollar Icon" className="w-5 h-5" /> */}
                  <span>RM{item.price} per night</span>
                </div>
                <div className="flex items-center">
                <img src={assets.bed} alt="Bed Icon" className="w-5 h-5" />
                  <span>3 Bedrooms</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                  <i className="fas fa-edit mr-2"></i>Edit
                </button>
                <button className="flex-1 border border-red-500 text-red-500 py-2 rounded hover:bg-red-50">
                  <i className="fas fa-trash-alt mr-2"></i>Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CottagesList