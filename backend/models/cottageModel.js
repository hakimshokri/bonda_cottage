import mongoose from "mongoose"

const cottageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    // size: {
    //     type: String,
    //     required: true
    // },
    // bedrooms: {
    //     type: Number,
    //     default: 1
    // },
    beds: {
        type: Number,
        required: true,
        default: 1
    },
    bathrooms: {
        type: Number,
        required: true,
        default: 1
    },
    status: {
        type: String,
        default: "Available"
    },
    amenities: {
        type: [String],
        default: [],
    },
    main_image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    slots_booked: {
        type: Array,
        default: []
    }
}, { minimize: false })

const cottageModel = mongoose.models.cottage || mongoose.model('cottage', cottageSchema)

export default cottageModel