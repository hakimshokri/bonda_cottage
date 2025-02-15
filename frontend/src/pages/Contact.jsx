import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[70px]">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p class="text-lg text-gray-600">Get in Touch with Bonda Cottage</p>
      </div>
      <div class="grid grid-cols-1 gap-12">
        <div class="max-w-2xl mx-auto">
          <div class="bg-white shadow rounded-lg p-8 mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <img src={assets.location_black} alt="Location Icon" class="w-6 h-6" />
                </div>
                <div class="ml-4">
                  <p class="text-gray-900 font-medium">Address</p>
                  <p class="text-gray-600">
                    Lot 123, Kampung Seberang Takir<br />
                    21000 Kuala Terengganu<br />
                    Terengganu, Malaysia
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <img src={assets.phone_call} alt="Phone Icon" class="w-6 h-6" />
                </div>
                <div class="ml-4">
                  <p class="text-gray-900 font-medium">Phone</p>
                  <p class="text-gray-600">+60 1234 5678</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <img src={assets.email_2} alt="Email Icon" class="w-6 h-6" />
                </div>
                <div class="ml-4">
                  <p class="text-gray-900 font-medium">Email</p>
                  <p class="text-gray-600">info@bondacottage.com</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <img src={assets.clock} alt="Clock Icon" class="w-6 h-6" />
                </div>
                <div class="ml-4">
                  <p class="text-gray-900 font-medium">Business Hours</p>
                  <p class="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 6:00 PM<br />Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white shadow rounded-lg p-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">Follow Us</h2>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-black">
                <img src={assets.facebook} alt="Facebook" class="w-8 h-8" />
              </a>
              <a href="#" class="text-gray-400 hover:text-black">
                <img src={assets.instagram} alt="Instagram" class="w-8 h-8" />
              </a>
              <a href="#" class="text-gray-400 hover:text-black">
                <img src={assets.tiktok} alt="Tiktok" class="w-8 h-8" />
              </a>
              <a href="#" class="text-gray-400 hover:text-black">
                <img src={assets.whatsapp} alt="WhatsApp" class="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
        <div>


        </div>
      </div>
      <div class="mt-16 bg-white shadow rounded-lg p-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h3 class="text-lg font-medium text-gray-900">What are your check-in and check-out times?</h3>
            <p class="mt-2 text-gray-600">Check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request.</p>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900">Do you offer airport transfers?</h3>
            <p class="mt-2 text-gray-600">Yes, we can arrange airport transfers for an additional fee. Please contact us in advance to make arrangements.</p>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900">Is parking available?</h3>
            <p class="mt-2 text-gray-600">Yes, we offer free on-site parking for all our guests.</p>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900">What is your cancellation policy?</h3>
            <p class="mt-2 text-gray-600">Cancellations made 48 hours before check-in are fully refundable. Later cancellations may be subject to fees.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
