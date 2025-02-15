import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { addDays } from 'date-fns';

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [cottages, setCottages] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setUserData] = useState(false)
    const [searchData, setSearchData] = useState({
        dateRange: [
            {
                startDate: new Date(),
                endDate: addDays(new Date(), 1),
                key: 'selection',
            },
        ],
        guests: "1 Guest",
    });

    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')

    const getCottagesData = async () => {

        try {
            const { data } = await axios.get(backendUrl + '/api/cottage/list')
            if (data.success) {
                setCottages(data.cottages)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    const loadUserProfileData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {
        getCottagesData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])

    const value = {
        backendUrl,
        cottages,
        getCottagesData,
        token,
        setToken,
        userData,
        setUserData,
        loadUserProfileData,
        searchData,
        setSearchData,
        forgotPasswordEmail,
        setForgotPasswordEmail
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
