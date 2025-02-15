import { v2 as cloudinary } from 'cloudinary'
import cottageModel from '../models/cottageModel.js'
import jwt from 'jsonwebtoken'
import bookingModel from '../models/bookingModel.js'
import { format, addDays } from 'date-fns'
import userModel from '../models/userModel.js'

// API for adding cottage
const addCottage = async (req, res) => {

    try {

        const { name, price, beds, bathrooms, status, amenities, description } = req.body
        const imageFile = req.file

        // checking for all data to add cottage
        if (!name || !price || !beds || !bathrooms || !status || !amenities || !description || !imageFile) {
            return res.json({ success: false, message: "Please fill all the fields" })
        }

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const cottageData = {
            name,
            price,
            beds,
            bathrooms,
            status,
            amenities,
            description,
            image: imageUrl,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }

        const newCottage = new cottageModel(cottageData)
        await newCottage.save()

        res.json({ success: true, message: "Cottage added successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for admin login
const loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            return res.json({ success: true, token })

        }
        else {
            return res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get all cottages list for admin panel
const allCottages = async (req, res) => {

    try {

        const cottages = await cottageModel.find({})
        res.json({ success: true, cottages })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get all bookings list for admin panel
const bookingsAdmin = async (req, res) => {

    try {

        const bookings = await bookingModel.find({})
        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to cancel booking for admin panel
const bookingCancel = async (req, res) => {

    try {

        const { bookingId } = req.body

        const bookingData = await bookingModel.findById(bookingId)

        // cancel booking
        await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true })

        // update cottage slots
        const { cottageId, checkInDate, checkOutDate } = bookingData

        const cottageData = await cottageModel.findById(cottageId)

        let slots_booked = cottageData.slots_booked

        let dates = [];
        let currentDate = new Date(checkInDate);

        while (currentDate < new Date(checkOutDate)) {
            dates.push(format(currentDate, 'dd-MM-yyyy')); // Store as "YYYY-MM-DD"
            currentDate = addDays(currentDate, 1);
        }

        // remove dates from slots_booked
        slots_booked = slots_booked.filter(date => !dates.includes(date))

        await cottageModel.findByIdAndUpdate(cottageId, { slots_booked })

        res.json({ success: true, message: "Booking Cancelled" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {

    try {

        const cottages = await cottageModel.find({})
        const bookings = await bookingModel.find({})
        const users = await userModel.find({})

        // calculate revenue
        let revenue = 0
        for (let i = 0; i < bookings.length; i++) {
            revenue += bookings[i].amount
        }

        const dashboardData = {
            cottages: cottages.length,
            bookings: bookings.length,
            users: users.length,
            latestBookings: bookings.reverse().slice(0, 5),
            revenue: revenue
        }

        res.json({ success: true, dashboardData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { addCottage, loginAdmin, allCottages, bookingsAdmin, bookingCancel, adminDashboard }