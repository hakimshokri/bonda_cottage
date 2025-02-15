import React from 'react'
import { assets } from '../assets/assets'

const PerfectLocation = () => {
    return (
        <div class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-6">
                <div class="grid md:grid-cols-2 gap-16 items-center">
                    <div class="relative h-[400px] rounded-lg overflow-hidden">
                        <img src="https://ai-public.creatie.ai/gen_page/map_placeholder_1280x720.png" class="absolute inset-0 w-full h-full object-cover" alt="Location Map" />
                    </div>
                    <div>
                        <h2 class="font-[&#39;Playfair_Display&#39;] text-3xl font-semibold mb-6">Perfect Location</h2>
                        <p class="text-gray-600 mb-6">Located just 2 hours from the city, Bonda Cottage offers easy access to numerous natural attractions and activities:</p>
                        <ul class="space-y-4">
                            <li class="flex items-center space-x-3">
                                <img src={assets.location_2} alt="Map Icon" class="w-5 h-5" />
                                <span>15 minutes to Crystal Lake</span>
                            </li>
                            <li class="flex items-center space-x-3">
                                <img src={assets.location_2} alt="Map Icon" class="w-5 h-5" />
                                <span>30 minutes to Mountain Peak trails</span>
                            </li>
                            <li class="flex items-center space-x-3">
                                <img src={assets.location_2} alt="Map Icon" class="w-5 h-5" />
                                <span>10 minutes to local village markets</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PerfectLocation