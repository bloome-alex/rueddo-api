import express from 'express'
import { body } from 'express-validator'

import {
    authenticationController,
    registerController,
    loginController,
    registerGoogleController,
    loginGoogleController,
    fetchUsersController,
    updateUserController
} from '../controllers'
import { recoveryUserController, validCodeController } from '../controllers/recoveryUserController'
import { fetchTravelByDesignedClientController } from '../controllers/Travel/fetchTravelByDesignedClient'
import { fetchTravelByDesignedDriverController } from '../controllers/Travel/fetchTravelByDesignedDriver'
import { fetchTravelsController } from '../controllers/Travel/fetchTravelsController'
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
    res.status(200).json(pushSubscriptions)
})

ApiRoutes.get('/fetch-users', fetchUsersController)

ApiRoutes.post('/update-user', updateUserController)

ApiRoutes.post('/client-travels', fetchTravelByDesignedClientController)
ApiRoutes.post('/driver-travels', fetchTravelByDesignedDriverController)

ApiRoutes.get('/travel/:id', getTravelByIdController)

ApiRoutes.get('/fetch-travels', fetchTravelsController)

ApiRoutes.post('/recovery-user', recoveryUserController)
ApiRoutes.post('/recovery-user/code', validCodeController)

export {ApiRoutes}