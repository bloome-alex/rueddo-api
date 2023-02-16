import mongoose from 'mongoose'

const RecoveryUserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique:false, index: false},
    code: {type: String, required: true, unique: false, index: false}
  }, {timestamps: true})
  
  export const RecoveryUser = mongoose.model('RecoveryUser', RecoveryUserSchema)