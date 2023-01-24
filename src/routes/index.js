import express from 'express'
import { body } from 'express-validator'
import fs from 'fs'

import {
    authenticationController,
    registerController,
    loginController,
    registerGoogleController,
    loginGoogleController,
    fetchUsersController,
    updateUserController
} from '../controllers'

const ApiRoutes = express.Router()

ApiRoutes.post('/register', 
    body('email').isEmail(),
    registerController)

ApiRoutes.post('/register-google', registerGoogleController)

ApiRoutes.post('/login',
    loginController )

ApiRoutes.post('/login-google',
    loginGoogleController )

ApiRoutes.post('/auth', 
    authenticationController )

ApiRoutes.post('/subscribe', async(req, res)=>{
    let pushSubscriptions = req.body
    console.log('sub: ', pushSubscriptions)
    fs.writeFileSync('./src/webpush/subscription.json', JSON.stringify(pushSubscriptions))
    res.status(200).json()
    console.log('notifiación enviada')
})

ApiRoutes.get('/fetch-users', fetchUsersController)

ApiRoutes.post('/update-user', updateUserController)

export {ApiRoutes}