import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate()

    return (
        <div class="bg-gray-50 text-gray-800 py-16">
            <div class="max-w-7xl mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-600">
                    <div class="mb-8 md:mb-0">
                        <img src={assets.cottage_logo} alt="Bonda Cottage" class="h-12 mb-6" />
                        <p class="text-gray-400">Experience luxury and tranquility in nature&#39;s embrace</p>
                    </div>
                    <div class="mb-8 md:mb-0">
                        <h3 class="font-medium text-lg mb-4">Quick Links</h3>
                        <ul class="space-y-2 text-gray-600">
                            <li><a onClick={() => { navigate('/cottages'); scrollTo(0, 0) }} class="hover:text-black cursor-pointer">Our Cottages</a></li>
                            <li><a onClick={() => { navigate('/about'); scrollTo(0, 0) }} class="hover:text-black cursor-pointer">About</a></li>
                            <li><a onClick={() => { navigate('/contact'); scrollTo(0, 0) }} class="hover:text-black cursor-pointer">Contact</a></li>
                        </ul>
                    </div>
                    <div class="mb-8 md:mb-0">
                        <h3 class="font-medium text-lg mb-4">Contact Us</h3>
                        <ul class="space-y-2 text-gray-600">
                            <li>+60 1234 5678</li>
                            <li>info@bondacottage.com</li>
                        </ul>
                    </div>
                    <div class="mb-8 md:mb-0 mr-auto">
                        <h3 class="font-medium text-lg mb-4">Follow Us</h3>
                        <div class="flex justify-center md:justify-start space-x-4 text-gray-600">
                            <a href="#" class="text-gray-600 hover:text-black">
                                <img src={assets.facebook} alt="Facebook" class="w-6 h-6" />
                            </a>
                            <a href="#" class="text-gray-600 hover:text-black">
                                <img src={assets.instagram} alt="Instagram" class="w-6 h-6" />
                            </a>
                            <a href="#" class="text-gray-600 hover:text-black">
                                <img src={assets.tiktok} alt="Tiktok" class="w-6 h-6" />
                            </a>
                            <a href="#" class="text-gray-600 hover:text-black">
                                <img src={assets.whatsapp} alt="WhatsApp" class="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
                    <p>© 2025 Bonda Cottage. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer