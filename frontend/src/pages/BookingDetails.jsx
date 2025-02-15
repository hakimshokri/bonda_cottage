import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import { format, addDays, differenceInCalendarDays } from 'date-fns'
import axios from 'axios';

const BookingDetails = () => {

    const { cottageId } = useParams()
    const navigate = useNavigate()

    const { cottages, getCottagesData, backendUrl, token, searchData, setSearchData, userData, setUserData } = useContext(AppContext)
    const [cottageInfo, setCottageInfo] = useState(false)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [specialRequests, setSpecialRequests] = useState('')
    const [totalAmount, setTotalAmount] = useState(0)
    const [numberOfNights, setNumberOfNights] = useState(0)

    const fetchCottageInfo = async () => {
        const cottageInfo = cottages.find((cottage) => cottage._id === cottageId)
        setCottageInfo(cottageInfo)

        setFullName(userData.name)
        setEmail(userData.email)
        setPhone(userData.phone)
    }

    const checkSlotAvailability = async () => {

        try {

            if (format(searchData.dateRange[0].endDate, 'dd-MM-yyyy') === format(searchData.dateRange[0].startDate, 'dd-MM-yyyy')) {
                return toast.error('Please select a valid date range')
            }

            const { data } = await axios.post(backendUrl + '/api/user/check-slot', { cottageId, startDate: searchData.dateRange[0].startDate, endDate: searchData.dateRange[0].endDate })

            if (!data.success) {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    const bookCottage = async () => {

        try {

            if (!fullName || !email || !phone) {
                return toast.error('Please fill all the fields')
            }

            checkSlotAvailability()

            const { data } = await axios.post(backendUrl + '/api/user/book-cottage', { cottageId, startDate: searchData.dateRange[0].startDate, endDate: searchData.dateRange[0].endDate, fullName, email, phone, guests: searchData.guests, specialRequests, amount: totalAmount }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getCottagesData()
                bookingStripe(data.bookingId)
                // navigate('/my-bookings')
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
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
        if (cottages.length > 0) {
            fetchCottageInfo()
        }
    }, [cottages, cottageId])

    useEffect(() => {

        // Calculate the number of nights between startDate and endDate
        const checkIn = new Date(searchData.dateRange[0].startDate)
        const checkOut = new Date(searchData.dateRange[0].endDate)

        // Calculate number of nights using date-fns difference function
        const numberOfNights = differenceInCalendarDays(checkOut, checkIn);

        setNumberOfNights(numberOfNights)

        // Calculate total amount
        const totalAmount = numberOfNights * cottageInfo.price

        setTotalAmount(totalAmount)

    }, [searchData, cottageInfo])

    return cottageInfo ? (
        <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-[70px]">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <div class="col-span-12 md:col-span-8">
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <div class="aspect-w-16 aspect-h-9">
                            <img src={cottageInfo.main_image} alt="Cottage Interior" class="w-full h-[500px] object-cover rounded-tl-lg rounded-tr-lg" />
                        </div>
                        <div class="p-6">
                            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                <div>
                                    <h1 class="text-2xl font-semibold text-gray-900">Lakeside Luxury Cottage</h1>
                                    <div class="mt-1 flex items-center">
                                        <img src={assets.star} alt="Star Icon" className="w-4 h-4" />
                                        <span class="ml-1 text-sm text-gray-600">4.9 (128 reviews)</span>
                                    </div>
                                </div>
                                <div class="flex flex-wrap space-x-2 sm:space-x-4 mt-4 sm:mt-0">
                                    <div class="text-center">
                                        <img src={assets.bed} alt="Bed Icon" class="w-6 h-6 text-gray-400 mx-auto" />
                                        <p class="mt-1 text-sm text-gray-600">3 Beds</p>
                                    </div>
                                    <div class="text-center">
                                        <img src={assets.bath} alt="Bath Icon" class="w-6 h-6 text-gray-400 mx-auto" />
                                        <p class="mt-1 text-sm text-gray-600">2 Baths</p>
                                    </div>
                                    <div class="text-center">
                                        <img src={assets.guests} alt="Guests Icon" class="w-6 h-6 text-gray-400 mx-auto" />
                                        <p class="mt-1 text-sm text-gray-600">6 Guests</p>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-8">
                                <h2 class="text-lg font-semibold text-gray-900">Select Dates</h2>
                                <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-2 mt-4">Check-in & Check-out</label>
                                    <div onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} >
                                        <p className='block w-1/2 pl-2 pr-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm'>{format(searchData.dateRange[0].startDate, 'dd MMM yyyy')} - {format(searchData.dateRange[0].endDate, 'dd MMM yyyy')}</p>
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
                            </div>
                            <div class="mt-8">
                                <h2 class="text-lg font-semibold text-gray-900">Guest Information</h2>
                                <div class="mt-4 space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input onChange={(e) => setFullName(e.target.value)} value={fullName} type="text" class="mt-1 block w-1/2 rounded border-gray-300 border pl-2 pr-3 py-2" placeholder="Enter your full name" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">Email Address</label>
                                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" class="mt-1 block w-1/2 rounded border-gray-300 border pl-2 pr-3 py-2" placeholder="you@example.com" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">Phone Number</label>
                                        <input onChange={(e) => setPhone(e.target.value)} value={phone} type="tel" class="mt-1 block w-1/2 rounded border-gray-300 border pl-2 pr-3 py-2" placeholder="+1 (555) 000-0000" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">Number of Guests</label>
                                        <select onChange={(e) => setSearchData({ ...searchData, guests: e.target.value })} value={searchData.guests} class="mt-1 block w-1/2 rounded border-gray-300 border pl-2 pr-3 py-2">
                                            <option>1 Guest</option>
                                            <option>2 Guests</option>
                                            <option>3 Guests</option>
                                            <option>4 Guests</option>
                                            <option>5 Guests</option>
                                            <option>6 Guests</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">Special Requests</label>
                                        <textarea onChange={(e) => setSpecialRequests(e.target.value)} value={specialRequests} class="mt-1 block w-full rounded border-gray-300 border pl-2 pr-3 py-2" rows="4" placeholder="Any special requests or notes?"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-4">
                    <div class="bg-white rounded-lg shadow p-6 sticky top-24">
                        <h2 class="text-lg font-semibold text-gray-900">Booking Summary</h2>
                        <div class="mt-6 space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">{numberOfNights} night{`${numberOfNights > 1 ? 's' : ''}`} x RM{cottageInfo.price}</span>
                                <span class="text-gray-900">RM{totalAmount}</span>
                            </div>
                            <div class="pt-4 border-t">
                                <div class="flex justify-between">
                                    <span class="font-semibold text-gray-900">Total</span>
                                    <div class="text-right">
                                        <div class="font-semibold text-gray-900">RM{totalAmount}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6">
                            <button onClick={bookCottage} class="w-full rounded bg-blue-600 text-white py-3 font-medium">
                                Confirm Booking
                            </button>
                        </div>
                        <div class="mt-6 text-sm text-gray-500">
                            <h3 class="font-medium text-gray-900">Cancellation Policy</h3>
                            <p class="mt-2">Free cancellation for 48 hours. After that, cancel before check-in and get a 50% refund, minus the service fee.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default BookingDetails