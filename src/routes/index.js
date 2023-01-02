import express from 'express'
import { body } from 'express-validator'


import {
    authenticationController,
    registerController,
    loginController
} from '../controllers'

const ApiRoutes = express.Router()

ApiRoutes.post('/register', 
    body('email').isEmail(),
    registerController)

ApiRoutes.post('/login',
    loginController )

ApiRoutes.post('/auth', 
    authenticationController )

export {ApiRoutes}