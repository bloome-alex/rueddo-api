import mongoose from 'mongoose'

const destinationsSchema = new mongoose.Schema({
    address: {type: String, required: false, index: false},
    lat: {type: Number, required: true, index: false},
    lng: {type: Number, required: true, index: false},
    floor: {type: String, required: false, index: false},
    contact: {type: String, required: false, index: false},
    phone: {type: String, required: false, index: false},
    message: {type: String, required: false, index: false}
})

const originSchema = new mongoose.Schema({
    address: {type: String, required: false, index: false},
    lat: {type: Number, required: true, index: false},
    lng: {type: Number, required: true, index: false},
    floor: {type: String, required: false, index: false},
    contact: {type: String, required: false, index: false},
    phone: {type: String, required: false, index: false},
    optionalMessage: {type: String, required: false, index: false}
})

const TravelSchema = new mongoose.Schema({
    origin: originSchema,
    destinations: [destinationsSchema],
    designedDriver: {type: String, required: false, index: false},
    designedClient: {type: String, required: false, index: false},
    delivery: {type: String, required: true, index: false},
    date: { type: String, required: false, index: false },
    vehicle: {type: String, required: false, index: false},
    help: {type: String, required: false, index: false},
    methodOfPay: {type: String, required: false, index: false},
    payLocation: {type: String, required: false, index: false},
    status: {type: String, required: false, default: 'CREATED', index: false}
}, {timestamps: true})

export const Travel = mongoose.model('Travel', TravelSchema)
