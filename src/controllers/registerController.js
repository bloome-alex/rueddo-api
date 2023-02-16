import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import { registerUser } from '../services/UserServices'

export const registerController = async(request, response) => {

    const errors = validationResult(request)
    
    if(!errors.isEmpty()){
        return response.status(400).json({
            errors: errors.array()
        })
    }
    
    const {email, password, role, details} = request.body
    if(!email || !password || !role || !details) return response.status(402).send('Alguno de los parametros email, password o role del body no están definidos.')

    bcrypt.hash(password, 10).then(async(hash)=>{
        const user = await registerUser({email, password: hash, role, details})
        console.log('user: ', user)
        return response.status(200).json({
            message: 'Usuario creado con exito',
            user
        })
    }).catch((error) => {
        console.log('Sucedió un error en registerController -> ', error)
        return response.status(500).json({
            message: 'Sucedió un error en registerController',
            error
        })
    })
}