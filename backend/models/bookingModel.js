import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    cottageId: {
        type: String,
        required: true,
    },
    checkInDate: {
        type: String,
        required: true,
    },
    checkOutDate: {
        type: String,
        required: true,
    },
    userData: {
        type: Object,
        required: true,
    },
    cottageData: {
        type: Object,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    guests: {
        type: String,
        default: "",
    },
    specialRequest: {
        type: String,
        default: "",
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    cancelled: {
        type: Boolean,
        default: false,
    },
    payment: {
        type: Boolean, 
        default: false,
    },
})

const bookingModel = mongoose.models.booking || mongoose.model('booking', bookingSchema)

export default bookingModel