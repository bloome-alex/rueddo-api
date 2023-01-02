import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: {type: String, required: true, index: false},
  password: {type: String, required: true, index: false},
  role: {type: String, enum: ['DRIVER', 'CLIENT']}
}, {timestamps: true})

export const User = mongoose.model('User', UserSchema)
