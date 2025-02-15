import React, { useContext } from 'react'
import { assets } from '../assets/assets'

const FeaturedCottages = () => {

    return (
        <div class="py-24 sm:py-32">
            <div class="mx-auto max-w-8xl px-6 lg:px-8">
                <div class="mx-auto max-w-2xl text-center">
                    <h2 class="font-[&#39;Playfair_Display&#39;] text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome to Bonda Cottage</h2>
                    <p class="mt-6 text-lg leading-8 text-gray-600">Where every stay becomes an unforgettable experience. Our cottages offer the perfect escape from city life, surrounded by nature&#39;s beauty.</p>
                </div>
                <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <article class="flex flex-col items-start">
                        <div class="relative w-full">
                            <img src={assets.cozy_interior} alt="Cozy Interior" class="aspect-[16/9] w-full rounded-2xl object-cover" />
                        </div>
                        <div class="max-w-xl">
                            <h3 class="mt-6 text-lg font-semibold leading-6 text-gray-900">Cozy Interiors</h3>
                            <p class="mt-3 text-sm leading-6 text-gray-600">Thoughtfully designed spaces that blend modern comfort with rustic charm.</p>
                        </div>
                    </article>
                    <article class="flex flex-col items-start">
                        <div class="relative w-full">
                            <img src={assets.outdoor_living} alt="Outdoor Living" class="aspect-[16/9] w-full rounded-2xl object-cover" />
                        </div>
                        <div class="max-w-xl">
                            <h3 class="mt-6 text-lg font-semibold leading-6 text-gray-900">Outdoor Living</h3>
                            <p class="mt-3 text-sm leading-6 text-gray-600">Private decks and patios perfect for enjoying the surrounding nature.</p>
                        </div>
                    </article>
                    <article class="flex flex-col items-start">
                        <div class="relative w-full">
                            <img src={assets.nature_trails} alt="Nature Trails" class="aspect-[16/9] w-full rounded-2xl object-cover" />
                        </div>
                        <div class="max-w-xl">
                            <h3 class="mt-6 text-lg font-semibold leading-6 text-gray-900">Nature Trails</h3>
                            <p class="mt-3 text-sm leading-6 text-gray-600">Explore our private hiking trails and connect with nature.</p>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default FeaturedCottages