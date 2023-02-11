import { existEmail, loginUser, registreUserWithGoogle } from '../services/UserServices'

export const registerGoogleController = async(request, response) => {
    const {name, surname, email, role} = request.body

    const emailExists = await existEmail({email})

    if(emailExists) return response.status(402).json({
        msg: 'Email has existed in this system.',
        email
    })

    const details = {
        name,
        surname
    }
    const user = await registreUserWithGoogle({email, role, details})

    const token = await loginUser({email, authenticatedWithGoogle: true})

    if(user){
        return response.status(200).json({
            msg: 'Email has register successful',
            email,
            token
        }) 
    }

    return response.status(404).json({
        msg: 'Someone has not found'
    })
}