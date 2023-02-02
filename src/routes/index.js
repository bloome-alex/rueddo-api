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
import { fetchTravelByDesignedClientController } from '../controllers/Travel/fetchTravelByDesignedClient'
import { fetchTravelByDesignedDriverController } from '../controllers/Travel/fetchTravelByDesignedDriver'
import { getTravelByIdController } from '../controllers/Travel/getTravelByIdController'

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
    fs.writeFileSync('./src/webpush/subscription.json', JSON.stringify(pushSubscriptions))
    res.status(200).json()
})

ApiRoutes.get('/fetch-users', fetchUsersController)

ApiRoutes.post('/update-user', updateUserController)

ApiRoutes.post('/client-travels', fetchTravelByDesignedClientController)
ApiRoutes.post('/driver-travels', fetchTravelByDesignedDriverController)

ApiRoutes.get('/travel/:id', getTravelByIdController)

export {ApiRoutes}