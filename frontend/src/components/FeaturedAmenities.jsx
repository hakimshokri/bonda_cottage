import React from 'react'
import { assets } from '../assets/assets'

const FeaturedAmenities = () => {
    return (
        <div class="pb-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-6">
                <h2 class="font-[&#39;Playfair_Display&#39;] text-3xl font-semibold text-center mb-16">Featured Amenities</h2>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-white p-8 rounded-lg text-center">
                        <img src={assets.wifi} alt="WiFi Icon" class="w-16 h-16 mx-auto mb-4"></img>
                        <h3 class="text-xl font-semibold mb-3">High-Speed WiFi</h3>
                        <p class="text-gray-600">Stay connected with complimentary high-speed internet access throughout your stay</p>
                    </div>
                    <div class="bg-white p-8 rounded-lg text-center">
                        <img src={assets.hiking} alt="WiFi Icon" class="w-16 h-16 mx-auto mb-4"></img>
                        <h3 class="text-xl font-semibold mb-3">Nature Trails</h3>
                        <p class="text-gray-600">Explore marked hiking trails directly accessible from your cottage</p>
                    </div>
                    <div class="bg-white p-8 rounded-lg text-center">
                        <img src={assets.parking} alt="WiFi Icon" class="w-16 h-16 mx-auto mb-4"></img>
                        <h3 class="text-xl font-semibold mb-3">Private Parking</h3>
                        <p class="text-gray-600">Secure parking space available right at your cottage doorstep</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedAmenities