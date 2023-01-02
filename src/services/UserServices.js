import { User } from "../models/User"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const registerUser = async({email, password, role}) => {
    const user = new User({
        email,
        password,
        role
    })
    return await user.save()
}

export const loginUser = async({email, password}) => {
    try {
        const {JWT_SECRET} = process.env

        const user = await User.findOne({email})
        let token = null
        const result = bcrypt.compareSync(password, user.password)
        if(result) token = jwt.sign({
            email: email,
            role: user.role
        }, JWT_SECRET)
    
        if(token != null) return token
        return false
    } catch (error) {
        console.log('error: ', error)
        return false
    }
}

export const authenticationUser = ({token}) => {
    const {JWT_SECRET} = process.env
    
    return jwt.verify(token, JWT_SECRET)
}