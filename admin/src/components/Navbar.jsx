import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const { aToken, setAToken, title } = useContext(AdminContext)

    const navigate = useNavigate()

    return (
        <div class="bg-white border-b border-gray-200">
            <div class="px-6 py-4 flex items-center justify-between">
                <h1 class="text-xl font-semibold text-gray-800">{title}</h1>
                <div class="relative">
                    <button class="flex items-center space-x-3 !rounded-button">
                        <img src="https://creatie.ai/ai/api/search-image?query=A professional headshot of a middle-aged man wearing a business suit with a warm smile, photographed against a neutral background&width=40&height=40&flag=4a10b949-0244-49a3-a146-3411061ab065&flag=5a841da8-a812-4eab-9dae-0da1e5d31aed" alt="Admin" class="w-8 h-8 rounded-full object-cover" />
                        <span class="text-gray-700">John Admin</span>
                        <i class="fas fa-chevron-down text-gray-400 text-sm"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar