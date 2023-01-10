import mongoose from 'mongoose'

const vehicleDetailsSchema = new mongoose.Schema({
  patentPhoto: {type: String, required: false, index: false},
  patent: {type: String, required: false, index: false},
  mark: {type: String, required: false, index: false},
  model: {type: String, required: false, index: false},
  year: {type: String, required: false, index: false},
  longSpace: {type: Number, required: false, index: false},
  heightSpace: {type: String, required: false, index: false},
  widthSpace: {type: String, required: false, index: false},
})

const driverDocumentationSchema = new mongoose.Schema({
  drivingRecord: {type: String, required: false, index: false},
  greenCard: {type: String, required: false, index: false},
  greenCardCounterPart: {type: String, required: false, index: false},
  secureCard: {type: String, required: false, index: false},
  vtv: {type: String, required: false, index: false},
  category: {type: String, required: false, index: false},
  afip: {type: String, required: false, index: false},
})

const driverDetailsSchema = new mongoose.Schema({
  name: {type: String, required: false, index: false},
  surname: {type: String, required: false, index: false},
  birthDate: {type: String, required: false, index: false},
  cuit: {type: String, required: false, index: false},
  address: {type: String, required: false, index: false},
  floor: {type: String, required: false, index: false},
  email: {type: String, required: false, index: false},
  vehicleDetails: vehicleDetailsSchema,
  documentation: driverDocumentationSchema
})

const clientDetailsSchema = new mongoose.Schema({
  name: {type: String, required: false, index: false},
})

const UserSchema = new mongoose.Schema({
  email: {type: String, required: true, index: false},
  password: {type: String, required: true, index: false},
  role: {type: String, enum: ['DRIVER', 'CLIENT']},
  driverDetails: driverDetailsSchema,
  clientDetails: clientDetailsSchema
}, {timestamps: true})

export const User = mongoose.model('User', UserSchema)
