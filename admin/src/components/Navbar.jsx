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
                        <span class="text-gray-700">Admin</span>
                        <i class="fas fa-chevron-down text-gray-400 text-sm"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar