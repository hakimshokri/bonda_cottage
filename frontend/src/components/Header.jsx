import React, { useContext, useEffect, useState } from 'react'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Header = () => {

    const navigate = useNavigate()

    return (
        <div class="relative h-[85vh] overflow-hidden mt-[70px]">
            <img src={assets.homepage_bg_img} class="absolute inset-0 w-full h-full object-cover" alt="Bonda Cottage Exterior"/>
            <div class="absolute inset-0 bg-gray-900/40"></div>
            <div class="absolute inset-0 flex items-center">
                <div class="mx-auto max-w-8xl px-6 lg:px-8">
                    <div class="max-w-2xl">
                        <h1 class="font-[&#39;Playfair_Display&#39;] text-4xl font-bold tracking-tight text-white sm:text-6xl">Experience Tranquil Living at Bonda Cottage</h1>
                        <p class="mt-6 text-lg leading-8 text-gray-100">Escape to our peaceful retreat where nature meets luxury. Discover the perfect blend of comfort and serenity in our thoughtfully designed cottages.</p>
                        <div class="mt-10 flex items-center gap-x-6">
                            <a onClick={() => { navigate(`/cottages`); scrollTo(0, 0) }} class="rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100">Book Your Stay</a>
                            <a onClick={() => { navigate(`/about`); scrollTo(0, 0) }} class="text-sm font-semibold leading-6 text-white">Learn more <span aria-hidden="true">→</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header