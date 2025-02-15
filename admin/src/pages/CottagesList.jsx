import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'

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
          <div class="bg-white rounded-lg shadow-sm overflow-hidden group">
            <div class="aspect-w-16 aspect-h-9">
              <img src="https://creatie.ai/ai/api/search-image?query=A luxurious modern cottage exterior with large windows and wooden facade, surrounded by nature, photographed during golden hour with a clean, minimalist background&width=400&height=225&flag=826a4540-bf7a-4924-b35d-76e09c17a666&flag=b9922b78-371e-43a8-b565-c837f2986f58" alt="Luxury Cottage" class="object-cover" />
            </div>
            <div class="p-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-gray-800">Luxury Lake Cottage</h3>
                <span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Available</span>
              </div>
              <div class="text-gray-600 text-sm mb-4">
                <div class="flex items-center mb-1">
                  <i class="fas fa-dollar-sign w-5"></i>
                  <span>299 per night</span>
                </div>
                <div class="flex items-center">
                  <i class="fas fa-bed w-5"></i>
                  <span>3 Bedrooms</span>
                </div>
              </div>
              <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                  <i class="fas fa-edit mr-2"></i>Edit
                </button>
                <button class="flex-1 border border-red-500 text-red-500 py-2 !rounded-button hover:bg-red-50">
                  <i class="fas fa-trash-alt mr-2"></i>Delete
                </button>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm overflow-hidden group">
            <div class="aspect-w-16 aspect-h-9">
              <img src="https://creatie.ai/ai/api/search-image?query=A cozy mountain cottage with stone walls and a wooden porch, nestled in pine trees, photographed with warm lighting and a clean background&width=400&height=225&flag=326df324-7340-44a9-b632-25e8e0bf6d8c&flag=59679b5f-8bca-4c51-8527-70376f46d23e" alt="Mountain Cottage" class="object-cover" />
            </div>
            <div class="p-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-gray-800">Mountain View Cottage</h3>
                <span class="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">Booked</span>
              </div>
              <div class="text-gray-600 text-sm mb-4">
                <div class="flex items-center mb-1">
                  <i class="fas fa-dollar-sign w-5"></i>
                  <span>249 per night</span>
                </div>
                <div class="flex items-center">
                  <i class="fas fa-bed w-5"></i>
                  <span>2 Bedrooms</span>
                </div>
              </div>
              <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                  <i class="fas fa-edit mr-2"></i>Edit
                </button>
                <button class="flex-1 border border-red-500 text-red-500 py-2 !rounded-button hover:bg-red-50">
                  <i class="fas fa-trash-alt mr-2"></i>Delete
                </button>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm overflow-hidden group">
            <div class="aspect-w-16 aspect-h-9">
              <img src="https://creatie.ai/ai/api/search-image?query=A seaside cottage with white walls and blue shutters, overlooking the ocean, captured during sunset with a minimalist coastal background&width=400&height=225&flag=c267291a-8b21-4633-ae15-24a5f238b8e4&flag=ac6174d8-b5d0-4980-990d-425538a1cde8" alt="Beach Cottage" class="object-cover" />
            </div>
            <div class="p-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-gray-800">Seaside Cottage</h3>
                <span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Available</span>
              </div>
              <div class="text-gray-600 text-sm mb-4">
                <div class="flex items-center mb-1">
                  <i class="fas fa-dollar-sign w-5"></i>
                  <span>349 per night</span>
                </div>
                <div class="flex items-center">
                  <i class="fas fa-bed w-5"></i>
                  <span>4 Bedrooms</span>
                </div>
              </div>
              <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                  <i class="fas fa-edit mr-2"></i>Edit
                </button>
                <button class="flex-1 border border-red-500 text-red-500 py-2 !rounded-button hover:bg-red-50">
                  <i class="fas fa-trash-alt mr-2"></i>Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CottagesList