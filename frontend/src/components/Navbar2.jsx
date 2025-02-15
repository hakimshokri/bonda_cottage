import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar2 = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigate = useNavigate()

    const { token, setToken, userData, backendUrl } = useContext(AppContext)

    const [showMenu, setShowMenu] = useState(false)

    const sendVerificationOtp = async () => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/send-verify-otp', { email: userData.email }, { headers: { token } })

            if (data.success) {
                navigate('/verify-email')
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }

    }

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100">
            <nav className="max-w-8xl mx-auto px-6 h-20 flex items-center justify-between relative">
                <a onClick={() => { navigate('/'); scrollTo(0, 0) }} className="flex items-center">
                    <img src={assets.cottage_logo} alt="Bonda Cottage" class="h-12 cursor-pointer" />
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <a onClick={() => { navigate('/'); scrollTo(0, 0) }} className="text-black font-medium">Home</a>
                    <a onClick={() => { navigate('/cottages'); scrollTo(0, 0) }} className="text-gray-600 hover:text-black">Our Cottages</a>
                    <a onClick={() => { navigate('/about'); scrollTo(0, 0) }} className="text-gray-600 hover:text-black">About</a>
                    <a onClick={() => { navigate('/contact'); scrollTo(0, 0) }} className="text-gray-600 hover:text-black">Contact</a>

                    {
                        token && userData
                            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                                <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white'>
                                    {userData.name[0].toUpperCase()}
                                </div>
                                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                    <div className='min-w-48 bg-white border-gray-200 border rounded flex flex-col gap-4 p-4'>
                                        {!userData.isAccountVerified && <p onClick={sendVerificationOtp} className='hover:text-black cursor-pointer'>Verify Email</p>}
                                        <p onClick={() => { navigate('/my-profile'); scrollTo(0, 0) }} className='hover:text-black cursor-pointer'>My Profile</p>
                                        <p onClick={() => { navigate('/my-bookings'); scrollTo(0, 0) }} className='hover:text-black cursor-pointer'>My Bookings</p>
                                        <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                                    </div>
                                </div>
                            </div>
                            :
                            <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className="rounded-lg bg-black text-white px-6 py-2.5 font-medium">
                                Book Now
                            </button>
                    }

                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-black"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <img src={assets.menu} alt="Menu Icon" className="w-8 h-8" />
                </button>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 md:hidden">
                        <div className="flex flex-col py-4 px-6 space-y-4 text-right">
                            <a onClick={() => { navigate('/'); scrollTo(0, 0); setIsMobileMenuOpen(false) }} className="text-black font-medium cursor-pointer">Home</a>
                            <a onClick={() => { navigate('/cottages'); scrollTo(0, 0); setIsMobileMenuOpen(false) }} className="text-gray-600 hover:text-black cursor-pointer">Our Cottages</a>
                            <a onClick={() => { navigate('/about'); scrollTo(0, 0); setIsMobileMenuOpen(false) }} className="text-gray-600 hover:text-black cursor-pointer">About</a>
                            <a onClick={() => { navigate('/contact'); scrollTo(0, 0); setIsMobileMenuOpen(false) }} className="text-gray-600 hover:text-black cursor-pointer">Contact</a>
                            {
                                token && userData
                                    ? <div className='ml-auto flex items-center gap-2 cursor-pointer group relative'>
                                        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white'>
                                            {userData.name[0].toUpperCase()}
                                        </div>
                                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                            <div className='min-w-48 bg-white border-gray-200 border rounded flex flex-col gap-4 p-4'>
                                                {!userData.isAccountVerified && <p onClick={sendVerificationOtp} className='hover:text-black cursor-pointer'>Verify Email</p>}
                                                <p onClick={() => { navigate('/my-profile'); scrollTo(0, 0); setIsMobileMenuOpen(false) }} className='hover:text-black cursor-pointer'>My Profile</p>
                                                <p onClick={() => { navigate('/my-bookings'); scrollTo(0, 0); setIsMobileMenuOpen(false) }} className='hover:text-black cursor-pointer'>My Bookings</p>
                                                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <button onClick={() => { navigate('/login'); scrollTo(0, 0); setIsMobileMenuOpen(false) }} className="rounded-lg bg-black text-white px-6 py-2.5 font-medium">
                                        Book Now
                                    </button>
                            }
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar2;
