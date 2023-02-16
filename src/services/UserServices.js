import { User } from "../models/User"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { transporter } from "./mailer"

const generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result1= ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
}

export const recoveryUser = async(email) => {
    try {
        const code = generateRandomString(8)
        await transporter.sendMail({
            from: '"Forgot Password " <Servicios-Rueddo@rueddo.com>',
            to: email,
            Subject: 'Forgot Password',
            html: `
                <b>Tu código de recuperación es: <h2>${code}</h2></b>
            `
        })
        return code
    } catch (error) {
        throw new Error(error)
    }
}

export const existEmail = async({email}) => {
    const user = await User.findOne({email})
    console.log('user: ', user)
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
    const {JWT_SECRET} = process.env

    let user = await User.findOne({email})

    if(!user && authenticatedWithGoogle) user = await registreUserWithGoogle({email, role})

    if(authenticatedWithGoogle && !user.authenticatedWithGoogle) throw new Error('Esta cuenta pertenece a un usuario con contraseña ingrese manualmente')

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