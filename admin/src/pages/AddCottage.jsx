import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddCottage = () => {

  const { aToken, backendUrl } = useContext(AdminContext)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')
  const [status, setStatus] = useState('Available')
  const [description, setDescription] = useState('')

  const [mainImg, setMainImg] = useState(false)
  // const [interiorImg1, setInteriorImg1] = useState(false)
  // const [interiorImg2, setInteriorImg2] = useState(false)
  // const [interiorImg3, setInteriorImg3] = useState(false)
  // const [interiorImg4, setInteriorImg4] = useState(false)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      // if (!mainImg || !interiorImg1 || !interiorImg2 || !interiorImg3 || !interiorImg4) {
      //   return toast.error('Please upload all the images')
      // }

      if (!mainImg) {
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()

      formData.append('name', name)
      formData.append('price', Number(price))
      formData.append('size', size)
      formData.append('status', status)
      formData.append('description', description)
      formData.append('main_image', mainImg)
      // formData.append('interior_images', interiorImg1)
      // formData.append('interior_images', interiorImg2)
      // formData.append('interior_images', interiorImg3)
      // formData.append('interior_images', interiorImg4)

      // console log formData
      formData.forEach((value, key) => {
        console.log(key, value)
      })

      const { data } = await axios.post(backendUrl + '/api/admin/add-cottage', formData, { headers: { aToken } })

      if (data.success) {
        toast.success(data.message)
        setName('')
        setPrice('')
        setSize('')
        setDescription('')
        setMainImg(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="mt-8 bg-white shadow rounded-lg">
          <form class="p-6 space-y-8">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-gray-700">Cottage Name</label>
                <input type="text" class="mt-1 block w-full border-gray-300 rounded shadow-sm border pl-2 pr-3 py-2" required="" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Price per Night</label>
                <div class="mt-1 relative">
                  <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">RM</span>
                  <input type="number" class="block w-1/2 pl-9 border-gray-300 rounded shadow-sm border pr-3 py-2" required="" />
                </div>
              </div>
              <div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">Bedrooms &amp; Bathrooms</label>
                  <div class="grid grid-cols-2 gap-4"><div>
                    <select class="mt-1 block w-full border-gray-300 rounded shadow-sm border pl-2 pr-3 py-2">
                      <option>1 Bedroom</option>
                      <option>2 Bedrooms</option>
                      <option>3 Bedrooms</option>
                      <option>4 Bedrooms</option>
                    </select>
                  </div>
                    <div>
                      <select class="mt-1 block w-full border-gray-300 rounded shadow-sm border pl-2 pr-3 py-2">
                        <option>1 Bathroom</option>
                        <option>2 Bathrooms</option>
                        <option>3 Bathrooms</option>
                        <option>4 Bathrooms</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Status</label>
                <div class="mt-2 space-x-4">
                  <label class="inline-flex items-center">
                    <input type="radio" name="status" class="text-blue-600 border-gray-300"/>
                    <span class="ml-2 text-sm text-gray-700">Available</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input type="radio" name="status" class="text-blue-600 border-gray-300" />
                    <span class="ml-2 text-sm text-gray-700">Unavailable</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input type="radio" name="status" class="text-blue-600 border-gray-300" />
                    <span class="ml-2 text-sm text-gray-700">Under Maintenance</span>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Main Image</label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded">
                <div class="space-y-1 text-center">
                  <i class="fas fa-cloud-upload-alt text-gray-400 text-3xl mb-3"></i>
                  <div class="flex text-sm text-gray-600">
                    <label class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input type="file" class="sr-only" />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <textarea rows="4" class="mt-1 block w-full border-gray-300 rounded shadow-sm border pl-2 pr-3 py-2" required=""></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
              <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                <label class="inline-flex items-center">
                  <input type="checkbox" class="text-blue-600 border-gray-300 rounded" />
                  <span class="ml-2 text-sm text-gray-700">WiFi</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="checkbox" class="text-blue-600 border-gray-300 rounded" />
                  <span class="ml-2 text-sm text-gray-700">Swimming Pool</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="checkbox" class="text-blue-600 border-gray-300 rounded" />
                  <span class="ml-2 text-sm text-gray-700">Air Conditioning</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="checkbox" class="text-blue-600 border-gray-300 rounded" />
                  <span class="ml-2 text-sm text-gray-700">Kitchen</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="checkbox" class="text-blue-600 border-gray-300 rounded" />
                  <span class="ml-2 text-sm text-gray-700">Parking</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="checkbox" class="text-blue-600 border-gray-300 rounded" />
                  <span class="ml-2 text-sm text-gray-700">TV</span>
                </label>
              </div>
            </div>
            <div class="flex justify-end space-x-3 pt-6 border-t">
              <button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
                Clear Form
              </button>
              <button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded hover:bg-blue-700">
                Save Cottage
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddCottage