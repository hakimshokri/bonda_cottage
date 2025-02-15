import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='mt-[70px]'>
      <div class="relative h-[600px] overflow-hidden">
        <img src={assets.about_bg_img} class="absolute inset-0 w-full h-full object-cover" alt="Bonda Cottage Exterior" />
        <div class="absolute inset-0 bg-black bg-opacity-40"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div class="text-white">
            <h1 class="font-playfair text-5xl font-bold mb-4">Welcome to Bonda Cottage</h1>
            <p class="text-xl max-w-2xl">Your perfect escape into nature&#39;s embrace, where luxury meets tranquility. Experience the charm of our carefully crafted retreats, designed to provide unforgettable moments.</p>
          </div>
        </div>
      </div>
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="font-playfair text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p class="text-gray-600 leading-relaxed mb-6">Founded in 1985, Bonda Cottage began as a single family retreat in the heart of nature. What started as a personal haven has grown into a collection of thoughtfully designed cottages, each maintaining the warmth and character of a true home away from home.</p>
              <p class="text-gray-600 leading-relaxed">Over the years, we&#39;ve carefully preserved the natural beauty of our surroundings while adding modern comforts that our guests expect. Our commitment to providing an authentic, peaceful escape has never wavered.</p>
            </div>
            <div>
              <img src={assets.about_our_story} class="rounded-lg shadow-lg" alt="Bonda Cottage History" />
            </div>
          </div>
        </div>
      </section>
      <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="font-playfair text-4xl font-bold text-center text-gray-900 mb-16">Key Features</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div class="text-center">
              <div class="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center text-white mb-6">
                <img src={assets.tree_white} alt="Tree Icon" class="w-8 h-8" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-4">Peaceful Natural Setting</h3>
              <p class="text-gray-600">Surrounded by pristine forests and gardens, our location offers the perfect backdrop for relaxation and rejuvenation.</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center text-white mb-6">
                <img src={assets.house_white} alt="House Icon" class="w-8 h-8" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-4">Modern Amenities</h3>
              <p class="text-gray-600">Each cottage is equipped with high-end appliances and comfortable furnishings to ensure a luxurious stay.</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center text-white mb-6">
                <img src={assets.bellboy_white} alt="Hospitality Icon" class="w-8 h-8" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-4">Exceptional Hospitality</h3>
              <p class="text-gray-600">Our dedicated team ensures your stay is perfect from check-in to check-out with personalized service.</p>
            </div>
          </div>
        </div>
      </section>


      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="font-playfair text-4xl font-bold text-center text-gray-900 mb-16">Our Location</h2>
          <div class="relative h-[400px] rounded-lg overflow-hidden">
            <img src="https://ai-public.creatie.ai/gen_page/map_placeholder_1280x720.png" class="absolute inset-0 w-full h-full object-cover" alt="Location Map" />
            <div class="absolute inset-0 bg-black bg-opacity-10"></div>
            <div class="absolute bottom-8 left-8 bg-white p-6 rounded-lg shadow-lg max-w-md">
              <h3 class="font-bold text-gray-900 mb-2">Bonda Cottage</h3>
              <p class="text-gray-600 mb-4">Nestled in the heart of nature, just 2 hours from the city center. Surrounded by hiking trails, lakes, and local attractions.</p>
              <button class="bg-black text-white px-4 py-2 rounded flex items-center">
                <img src={assets.direction_white} alt="Directions Icon" class="w-5 h-5 mr-2" />
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
