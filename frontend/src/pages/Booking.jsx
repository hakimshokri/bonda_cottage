import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import { format, addDays } from 'date-fns';
import axios from 'axios';

const Booking = () => {

  const { cottageId } = useParams()
  const navigate = useNavigate()

  const { cottages, getCottagesData, backendUrl, token, searchData, setSearchData, userData } = useContext(AppContext)
  const [cottageInfo, setCottageInfo] = useState(false)
  const [cottageAvailable, setCottageAvailable] = useState(false)

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const fetchCottageInfo = async () => {
    const cottageInfo = cottages.find((cottage) => cottage._id === cottageId)
    setCottageInfo(cottageInfo)
  }

  const checkSlotAvailability = async () => {

    try {

      if (format(searchData.dateRange[0].endDate, 'dd-MM-yyyy') === format(searchData.dateRange[0].startDate, 'dd-MM-yyyy')) {
        return toast.error('Please select a valid date range')
      }

      const { data } = await axios.post(backendUrl + '/api/user/check-slot', { cottageId, startDate: searchData.dateRange[0].startDate, endDate: searchData.dateRange[0].endDate })

      if (data.success) {
        toast.success(data.message)

        if (!token) {
          return toast.warning('Please login to book a cottage')
        }

        if (!userData.isAccountVerified) {
          return toast.warning('Please verify your account to book a cottage')
        }

        navigate(`/booking-details/${cottageId}`)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      else {
        toast.error(data.message)
        setCottageAvailable(false)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }

  }

  const bookCottage = async () => {

    if (!token) {
      toast.warning('Please login to book a cottage')
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return navigate('/login')
    }

    try {

      const { data } = await axios.post(backendUrl + '/api/user/book-cottage', { cottageId, startDate: searchData.dateRange[0].startDate, endDate: searchData.dateRange[0].endDate }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getCottagesData()
        navigate('/my-bookings')
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }

  }

  // const handleDateChange = (item) => {
  //   setSearchData({ ...searchData, dateRange: [item.selection] })
  //   setCottageAvailable(false);
  // };


  useEffect(() => {
    if (cottages.length > 0) {
      fetchCottageInfo()
    }
  }, [cottages, cottageId])

  // useEffect(() => {
  //   // Auto scroll to a specific position when the date picker is opened
  //   if (isDatePickerOpen) {
  //     window.scrollTo({
  //       top: 450,
  //       behavior: 'smooth',  // Optional: adds smooth scrolling animation
  //     });
  //   }
  // }, [isDatePickerOpen]);

  return cottageInfo ? (
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-[70px]">
      <div class="mb-6">
        <a onClick={() => navigate(-1)} class="text-blue-600 hover:text-blue-700 flex items-center">
          <img src={assets.back} alt="Back Arrow" className="w-4 h-4 mr-2" />
          Back
        </a>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="glide mb-8">
            <div class="glide__track" data-glide-el="track">
              <ul class="glide__slides">
                <li class="glide__slide">
                  <img src={cottageInfo.main_image} alt="Cottage Interior" class="w-full h-[500px] object-cover rounded-lg" />
                </li>
                {/* <li class="glide__slide">
                  <img src="https://creatie.ai/ai/api/search-image?query=A cozy cottage bedroom with a king-size bed, premium linens, and rustic wooden beams. Large windows frame a stunning forest view, while modern amenities blend seamlessly with traditional cottage charm&width=1024&height=576&orientation=landscape&flag=dbed8c92-1a96-4115-b99b-e4d179bd1224&flag=84be2574-a028-4847-8958-c4f9900c9df1" alt="Bedroom" class="w-full h-[500px] object-cover rounded-lg" />
                </li>
                <li class="glide__slide">
                  <img src="https://creatie.ai/ai/api/search-image?query=A modern cottage kitchen with high-end appliances, marble countertops, and a large island. Natural light streams through windows, highlighting the clean lines and sophisticated design while maintaining a warm, inviting atmosphere&width=1024&height=576&orientation=landscape&flag=8be1cd24-0eca-4e99-ac85-9e7d5eb6d19a&flag=3058df87-0004-4f5a-8251-6c3c9215d808" alt="Kitchen" class="w-full h-[500px] object-cover rounded-lg" />
                </li> */}
              </ul>
            </div>
            {/* <div class="glide__bullets" data-glide-el="controls[nav]">
              <button class="glide__bullet" data-glide-dir="=0"></button>
              <button class="glide__bullet" data-glide-dir="=1"></button>
              <button class="glide__bullet" data-glide-dir="=2"></button>
            </div> */}
          </div>
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{cottageInfo.name}</h1>
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <img src={assets.star} alt="Star Icon" class="w-4 h-4" />
                <img src={assets.star} alt="Star Icon" class="w-4 h-4" />
                <img src={assets.star} alt="Star Icon" class="w-4 h-4" />
                <img src={assets.star} alt="Star Icon" class="w-4 h-4" />
                <img src={assets.star} alt="Star Icon" class="w-4 h-4" />
              </div>
              <span class="ml-2 text-gray-600">(4.8) · 124 reviews</span>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 class="text-xl font-semibold mb-4">About this cottage</h2>
            <p class="text-gray-600 mb-4">
              {cottageInfo.description}
            </p>
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="flex items-center">
                <img src={assets.guests_blue} alt="Guests Icon" class="w-5 h-5 mr-3" />
                <span>Up to 6 guests</span>
              </div>
              <div class="flex items-center">
                <img src={assets.bed_blue} alt="Bed Icon" class="w-5 h-5 mr-3" />
                <span>3 bedrooms</span>
              </div>
              <div class="flex items-center">
                <img src={assets.bath_blue} alt="Bath Icon" class="w-5 h-5 mr-3" />
                <span>2 bathrooms</span>
              </div>
              <div class="flex items-center">
                <img src={assets.size_blue} alt="Area Size Icon" class="w-5 h-5 mr-3" />
                <span>1,500 sq ft</span>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 class="text-xl font-semibold mb-4">Amenities</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div class="flex items-center">
                <i class="fas fa-wifi text-blue-600 mr-3"></i>
                <span>High-speed WiFi</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-snowflake text-blue-600 mr-3"></i>
                <span>Air conditioning</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-tv text-blue-600 mr-3"></i>
                <span>Smart TV</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-utensils text-blue-600 mr-3"></i>
                <span>Fully equipped kitchen</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-parking text-blue-600 mr-3"></i>
                <span>Free parking</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-hot-tub text-blue-600 mr-3"></i>
                <span>Hot tub</span>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 class="text-xl font-semibold mb-4">Guest Reviews</h2>
            <div class="space-y-6">
              <div class="border-b pb-6">
                <div class="flex items-center mb-2">
                  {/* <img src="https://creatie.ai/ai/api/search-image?query=A professional headshot of a smiling middle-aged woman with natural makeup and business casual attire against a neutral background, radiating warmth and approachability&width=64&height=64&orientation=squarish&flag=c494b1f8-018e-4ead-a9e7-25c8d08d2fd2&flag=cbac0ee4-8024-4469-8772-678ff68d6c93" alt="Sarah" class="w-12 h-12 rounded-full mr-4" /> */}
                  <div>
                    <h3 class="font-semibold">Sarah M.</h3>
                    <p class="text-gray-500 text-sm">Stayed in June 2023</p>
                  </div>
                </div>
                <div class="flex text-yellow-400 mb-2">
                  <img src={assets.star} alt="Star Icon" class="w-4 h-4" />
                  <img src={assets.star} alt="Star Icon" class="w-4 h-4" />
                  <img src={assets.star} alt="Star Icon" class="w-4 h-4" />
                  <img src={assets.star} alt="Star Icon" class="w-4 h-4" />
                  <img src={assets.star} alt="Star Icon" class="w-4 h-4" />
                </div>
                <p class="text-gray-600">
                  &#34;Absolutely stunning property! The views are breathtaking and the cottage itself is beautifully maintained. We loved the modern amenities while still feeling connected to nature. Will definitely return!&#34;
                </p>
              </div>
              <div class="border-b pb-6">
                <div class="flex items-center mb-2">
                  {/* <img src="https://creatie.ai/ai/api/search-image?query=A professional headshot of a young man in his early 30s wearing a casual button-up shirt, with a friendly smile and well-groomed appearance against a simple background&width=64&height=64&orientation=squarish&flag=c7aa02c9-e620-4bb9-a343-09372775887a&flag=b7f60d94-0e4a-4b1b-a17e-0d269c3d26a7" alt="Michael" class="w-12 h-12 rounded-full mr-4" /> */}
                  <div>
                    <h3 class="font-semibold">Michael R.</h3>
                    <p class="text-gray-500 text-sm">Stayed in May 2023</p>
                  </div>
                </div>
                <div class="flex text-yellow-400 mb-2">
                  <img src={assets.star} alt="Star Icon" class="w-4 h-4" />
                  <img src={assets.star} alt="Star Icon" class="w-4 h-4" />
                  <img src={assets.star} alt="Star Icon" class="w-4 h-4" />
                  <img src={assets.star} alt="Star Icon" class="w-4 h-4" />
                  <img src={assets.star} alt="Star Icon" class="w-4 h-4" />
                </div>
                <p class="text-gray-600">
                  &#34;Perfect getaway spot! The kitchen is well-equipped, and we loved spending evenings in the hot tub. The host was very responsive and helpful. Highly recommend!&#34;
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <div class="mb-6">
              <h3 class="text-2xl font-bold mb-2">RM{cottageInfo.price}<span class="text-gray-500 text-base font-normal">/night</span></h3>
            </div>
            <div class="space-y-4 mb-6">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Check-in & Check-out</label>
                <div onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} >
                  <p className='block w-full pl-2 pr-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm'>{format(searchData.dateRange[0].startDate, 'dd MMM yyyy')} - {format(searchData.dateRange[0].endDate, 'dd MMM yyyy')}</p>
                </div>
                {
                  isDatePickerOpen &&
                  <DateRange
                    onChange={(item) => {
                      setSearchData({ ...searchData, dateRange: [item.selection] })
                    }}
                    ranges={searchData.dateRange}
                    minDate={new Date()}
                  />
                }

              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                <select onChange={(e) => setSearchData({ ...searchData, guests: e.target.value })} value={searchData.guests} class="w-full border-gray-300 rounded-md shadow-sm border pl-2 pr-3 py-2">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                  <option>5 Guests</option>
                  <option>6 Guests</option>
                </select>
              </div>
            </div>
            <button onClick={checkSlotAvailability} class="w-full rounded bg-blue-600 text-white py-3 mb-4">Book Now</button>
            <div class="text-sm text-gray-500 text-center">
              You won&#39;t be charged yet
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default Booking