import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setAToken, backendUrl } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {

        event.preventDefault()

        try {
            const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })

            if (data.success) {
                localStorage.setItem('aToken', data.token)
                setAToken(data.token)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col items-center'>
            <div>
                <img className='w-[180px] mt-[30px]' src={assets.cottage_logo} alt="" />
            </div>
            <form onSubmit={onSubmitHandler} className='flex flex-col rounded-[20px] border border-gray-300 p-8 shadow-lg mt-[60px] space-y-8 pb-[40px] px-[40px]'>
                <div>
                    <p className='text-[32px] font-semibold text-primary'>Admin Login</p>
                    <p className='text-[18px] font-light'>Please log in to access the admin panel</p>
                </div>
                <div>
                    <p className='text-[18px]'>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-[10px] border border-gray-300 shadow-lg w-full h-[44px] px-2' type="email" />
                </div>

                <div>
                    <p className='text-[18px]'>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-[10px] border border-gray-300 shadow-lg w-full h-[44px] px-2' type="password" />
                </div>

                <button className='rounded-[10px] bg-primary text-white font-semibold shadow-lg w-full h-[44px]'>Login</button>
            </form>
        </div>
    )
}

export default Login