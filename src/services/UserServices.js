import { User } from "../models/User"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const existEmail = async({email}) => {
    const user = await User.findOne({email})
    if(user) return true
    return false
}

export const registreUserWithGoogle = async({email, role}) => {
    const newUser = {
        email,
        role,
        authenticatedWithGoogle: true
    }

    const user = new User(newUser)
    return await user.save()
}

export const registerUser = async({email, password, role, details}) => {
    const newUser = {
        email,
        password,
        role
    }

    if(role == 'DRIVER') newUser.driverDetails = details
    if(role == 'CLIENT') newUser.clientDetails = details
    
    const user = new User(newUser)
    return await user.save()
}

export const loginUser = async({email, password, authenticatedWithGoogle, role}) => {
    try {
        const {JWT_SECRET} = process.env

        let user = await User.findOne({email})

        if(!user && authenticatedWithGoogle) user = await registreUserWithGoogle({email, role})

        if(authenticatedWithGoogle && user.authenticatedWithGoogle){
            let token = null
            token = jwt.sign({
                email: email,
                role: user.role
            }, JWT_SECRET)
            if(token != null) return token
            return false
        }

        let token = null
        const result = bcrypt.compareSync(password, user.password)
        if(result) token = jwt.sign({
            email: email,
            role: user.role
        }, JWT_SECRET)
    
        if(token != null) return token
        return false
    } catch (error) {
        return false
    }
}

export const authenticationUser = async({token}) => {
    const {JWT_SECRET} = process.env
    let user = jwt.verify(token, JWT_SECRET)

    const userVerified = await User.findOne({email: user.email})

    user = {
        email: userVerified.email,
        role: userVerified.role,
        driverEnabled: userVerified.driverEnabled
    }

    return user
}